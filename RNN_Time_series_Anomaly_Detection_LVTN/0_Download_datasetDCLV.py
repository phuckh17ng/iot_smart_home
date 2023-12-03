import pickle
import torch
import json
import string
from pathlib import Path
# with open('dataset/Kitchen_Humi/labeled/test/Kitchen_Humi.pkl', 'rb') as f:
# # with open('dataset/nyc_taxi/labeled/train/nyc_taxi.pkl', 'rb') as f:
#     # print(pickle.load(f))
#     dataa = pickle.load(f)
#     data = torch.FloatTensor(dataa)
#     print(data)
offsetvalueofindex = 29000
valueofindex = 100
index0 = offsetvalueofindex
index1 = offsetvalueofindex
index2 = offsetvalueofindex
index3 = offsetvalueofindex
labeled_data = []
# Opening JSON file
f = open('Kitchen_Humi.json')
g = open('Kitchen_Temp.json')
h = open('Kitchen_Gas.json')
l = open('Kitchen_Rain.json')
# returns JSON object as 
# a dictionary
datahumi = json.load(f)
datatemp = json.load(g)
datagas = json.load(h)
datarain = json.load(l)
for i, datatemp1 in enumerate(datahumi[index0:]):
    flag = True
    tokens = []
    tem1 = datatemp1["created_at"][0:len(datatemp1["created_at"])-7]
    j = index1
    k = index2
    m = index3
    for j1,datatemp2 in enumerate(datatemp[j:]):
        tem2 = datatemp2["created_at"][0:len(datatemp2["created_at"])-7]
        if(tem1 == tem2):
            flag = True
            index1 = j1+ index1+1
            # print("humi :"+i["value"]+" temp :"+j["value"]+i["created_at"]+"\n")
            break
        else:
            flag &= False
    if(flag == False):
        print('temp2',tem2)
    for k1,datatemp3 in enumerate(datagas[k:]):
        tem3 = datatemp3["created_at"][0:len(datatemp3["created_at"])-7]
        if(tem1 == datatemp3["created_at"][0:len(datatemp3["created_at"])-7]):
            flag = True
            index2 = k1+index2+1
            # print("humi :"+i["value"]+" Gas :"+k["value"]+i["created_at"]+"\n")
            break
        else:
            flag &= False
    if(flag == False):
        print("temp3",tem3)
    for m1,datatemp4 in enumerate(datarain[m:]):
        tem4 = datatemp4["created_at"][0:len(datatemp4["created_at"])-7]
        if(tem1 == tem4):
            flag = True
            index3 = m1+index3+1
            # print("humi :"+i["value"]+" rain :"+m["value"]+i["created_at"]+"\n")
            break
        else: 
            flag &= False
    if(flag == False):
        print("temp4",tem4)
    if(flag == True):
        tokens.append(float(datatemp1["value"]))
        tokens.append(float(datatemp2["value"]))
        tokens.append(float(datatemp3["value"]))
        tokens.append(float(datatemp4["value"]))
        tokens.append(float(1))
        labeled_data.append(tokens)
        # print(labeled_data)
        print("humi :"+datatemp1["value"]+" temp :"+datatemp2["value"]+" Gas :"+datatemp3["value"]+" rain :"+datatemp4["value"]+" "+datatemp1["created_at"]+"\n")
    else:
        print(datatemp1["created_at"][0:len(datatemp1["created_at"])])
    if( i > (valueofindex)):
        break
smarthome_raw_path = Path('dataset/DCLV/raw/Kitchen_Humi.csv')
# smarthome_test_path = smarthome_raw_path.parent.parent.joinpath('labeled','train','DCLV').with_suffix('.pkl')
# smarthome_test_path.parent.mkdir(parents=True, exist_ok=True)
# print(" dump to pkl")
# with open(str(smarthome_test_path),'wb') as pkl:
#     pickle.dump(labeled_data[:13104], pkl)

smarthome_test_path = smarthome_raw_path.parent.parent.joinpath('labeled','test','DCLV').with_suffix('.pkl')
smarthome_test_path.parent.mkdir(parents=True, exist_ok=True)
with open(str(smarthome_test_path),'wb') as pkl:
    pickle.dump(labeled_data[:valueofindex], pkl)

# Closing file
f.close()
g.close()