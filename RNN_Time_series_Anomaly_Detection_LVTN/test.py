import pickle
import torch
import json
import string
# from subprocess import call
from pathlib import Path
import queue
# with open('dataset/Kitchen_Humi/labeled/test/Kitchen_Humi.pkl', 'rb') as f:
with open('dataset/DCLV/labeled/test/DCLV.pkl', 'rb') as f:
# with open('dataset/nyc_taxi/labeled/train/nyc_taxi.pkl', 'rb') as f:
    # print(pickle.load(f))
    dataa = pickle.load(f)
    data = torch.FloatTensor(dataa)
    print(data)

# # q1 = queue.Queue(5)
# # q1.put(1)
# # q1.put(2)
# # q1.put(2)
# # q1.put(4)
# # q1.put(5)
# # print(q1)
# print('call 2_anomaly_detection.py')
# call(["python", "2_anomaly_detection.py","--data","DCLV","--filename","DCLV.pkl","--prediction_window"," 10" ])