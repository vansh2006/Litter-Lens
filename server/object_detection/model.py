import cv2
import numpy as np
import tensorrt as trt
import pycuda.driver as cuda
import pycuda.autoinit
import simpleaudio as sa

# camera stuff

class TensorRTModel:
    def __init__(self, engine_path):
        self.engine_path = engine_path
        self.logger = trt.Logger(trt.Logger.ERROR)
        self.runtime = trt.Runtime(self.logger)

        with open(engine_path, "rb") as f: #load TensorRT engine
            self.engine = self.runtime.deserialize_cuda_engine(f.read())

        self.context = self.engine.create_execution_context()
        #size and shapes of input and output
        self.input_shape = self.engine.get_binding_shape(0)
        self.output_shape = self.engine.get_binding_shape(1)
        self.input_size = trt.volume(self.input_shape) * self.engine.max_batch_size
        self.output_size = trt.volume(self.output_shape) * self.engine.max_batch_size

        self.d_input = cuda.mem_alloc(self.input_size * 4)
        self.d_output = cuda.mem_alloc(self.output_size * 4)

        self.stream = cuda.Stream()
    
    def predict(self, input_data):
        input_data = input_data.ravel()
        cuda.memcpy_htod_async(self.d_input, input_data, self.stream)

        self.context.execute_async_v2 ( #run inference
            bindings=[int(self.d_input), int(self.d_output)],
            stream_handle=self.stream.handle)
        
        output = np.empty(self.output_shape, dtype=np.float32)
        cuda.memcpy_dtoh_async(output, self.d_output, self.stream)

        self.stream.synchronize()

        return output
    
model = TensorRTModel(r"C:\Users\matia\Documents\LitterLens\server\object_detection\taco.engine")

cap = cv2.VideoCapture(2, cv2.CAP_DSHOW)
cap.set(3, 640)
cap.set(4, 480)

while True:
    print("TEST!")
    success, img = cap.read()
    if not success:
        break
    #preprocess image
    input_image = cv2.resize(img, (model.input_shape[2], model.input_shape[3]))
    input_image = input_image.astype(np.float32)
    input_image = np.transpose(input_image, (2, 0, 1))  
    input_image = np.expand_dims(input_image, axis=0)
    #run inference on preprocessed image
    outputs = model.predict(input_image)

    boxes = outputs[0][:, 1:5]
    scores = outputs[0][:, 5:]

    for i in range(boxes.shape[0]):
        if scores[i] > 0.5: #confidence threshold
            box = boxes[i] * np.array([img.shape[1], img.shape[0], img.shape[1], img.shape[0]]) #scale bounding boxes
            (x, y, w, h) = box.astype("int") #convert to int
            cv2.rectangle(img, (x, y), (x + w, y + h), (0, 255, 0), 2) #draw rectangle

    cv2.imshow("Image", img)
    if cv2.waitKey(1) & 0xFF == ord('q'): #q key to exit the loop
        break

cap.release()
cv2.destroyAllWindows()