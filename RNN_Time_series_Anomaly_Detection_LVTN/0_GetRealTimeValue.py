# Example of using the MQTT client class to subscribe to a feed and print out
# any changes made to the feed.  Edit the variables below to configure the key,
# username, and feed to subscribe to for changes.

# Import standard python modules.
import sys
from pathlib import Path
from subprocess import call
import pickle
# Import Adafruit IO MQTT client.
from Adafruit_IO import MQTTClient
# import queue

# Set to your Adafruit IO key.
# Remember, your key is a secret,
# so make sure not to publish it when you publish this code!
ADAFRUIT_IO_KEY = 'aio_hFIU63rfVakg40t8zZ4RoPhQBTSR'

# Set to your Adafruit IO username.
# (go to https://accounts.adafruit.com to find your username)
ADAFRUIT_IO_USERNAME = 'huynhngoctan'

# Set to the ID of the feed to subscribe to for updates.
FEED_ID_Kitchen_temp = 'dclv.kitchen-temp'
FEED_ID_Kitchen_humi = 'dclv.kitchen-humi'
FEED_ID_Kitchen_gas  = 'dclv.kitchen-gas'
FEED_ID_Kitchen_IR   = 'dclv.kitchen-ir'
FEED_ID_Kitchen_rain = 'dclv.kitchen-rain'

labeled_data = []
lenght_labeled_data = 20 # number data to detection

valuetemp = [float(0),float(0),float(0),float(0),float(0)]

Flagvalue0 = False
Flagvalue1 = False
Flagvalue2 = False
Flagvalue3 = False
Flagvalue4 = False
def Get5SensorValue(feed_id, payload):
    tokens = []
    global Flagvalue0
    global Flagvalue1
    global Flagvalue2
    global Flagvalue3
    global Flagvalue4
    if(feed_id == "dclv.kitchen-humi"):
        valuetemp[0] = payload
        Flagvalue0 = True
    elif(feed_id == "dclv.kitchen-temp"):
        valuetemp[1] = payload
        Flagvalue1 = True
    elif(feed_id == "dclv.kitchen-gas"):
        valuetemp[2] = payload
        Flagvalue2 = True
    elif(feed_id == "dclv.kitchen-rain"):
        valuetemp[3] = payload
        Flagvalue3 = True
    elif(feed_id == "dclv.kitchen-ir"):
        valuetemp[4] = payload
        Flagvalue4 = True
    if(Flagvalue0 == True & Flagvalue1 == True & Flagvalue2 == True & Flagvalue3 ==  True & Flagvalue4 == True):
        tokens.append(float(valuetemp[0]))
        tokens.append(float(valuetemp[1]))
        tokens.append(float(valuetemp[2]))
        tokens.append(float(valuetemp[3]))
        tokens.append(float(valuetemp[4]))
        labeled_data.append(tokens)
        if(len(labeled_data)>lenght_labeled_data):
            del(labeled_data[:len(labeled_data)-lenght_labeled_data])
        print('Lenght labeled data: ',len(labeled_data))
        smarthome_raw_path = Path('dataset/DCLV/raw/Kitchen_Humi.csv')
        smarthome_test_path = smarthome_raw_path.parent.parent.joinpath('labeled','test',"DCLV").with_suffix('.pkl')
        smarthome_test_path.parent.mkdir(parents=True, exist_ok=True)
        with open(str(smarthome_test_path),'wb') as pkl:
            pickle.dump(labeled_data[:lenght_labeled_data], pkl)
        if(len(labeled_data)==lenght_labeled_data):
            print('call 2_anomaly_detection')
            call(["python", "2_anomaly_detection.py","--data", "DCLV", "--filename", "DCLV.pkl", "--prediction_window", "10", "--save_fig" ])
        Flagvalue0 = False
        Flagvalue1 = False
        Flagvalue2 = False
        Flagvalue3 = False
        Flagvalue4 = False  


    

# Define callback functions which will be called when certain events happen.
def connected(client):
    # Connected function will be called when the client is connected to Adafruit IO.
    # This is a good place to subscribe to feed changes.  The client parameter
    # passed to this function is the Adafruit IO MQTT client so you can make
    # calls against it easily.
    print('Connected to Adafruit IO!  Listening for {0} changes...'.format(FEED_ID_Kitchen_temp))
    # Subscribe to changes on a feed named DemoFeed.
    client.subscribe(FEED_ID_Kitchen_temp)
    client.subscribe(FEED_ID_Kitchen_humi)
    client.subscribe(FEED_ID_Kitchen_gas)
    client.subscribe(FEED_ID_Kitchen_IR)
    client.subscribe(FEED_ID_Kitchen_rain)

def subscribe(client, userdata, mid, granted_qos):
    # This method is called when the client subscribes to a new feed.
    print('Subscribed to {0} with QoS {1}'.format(FEED_ID_Kitchen_temp, granted_qos[0]))
    # print('Subscribed to {0} with QoS {1}'.format(FEED_ID_Kitchen_humi, granted_qos[0]))

def disconnected(client):
    # Disconnected function will be called when the client disconnects.
    print('Disconnected from Adafruit IO!')
    sys.exit(1)

def message(client, feed_id, payload):
    # Message function will be called when a subscribed feed has a new value.
    # The feed_id parameter identifies the feed, and the payload parameter has
    # the new value.

    print('Feed {0} received new value: {1}'.format(feed_id, payload))
    Get5SensorValue(feed_id, payload)
    




# Create an MQTT client instance.
client = MQTTClient(ADAFRUIT_IO_USERNAME, ADAFRUIT_IO_KEY)

# Setup the callback functions defined above.
client.on_connect    = connected
client.on_disconnect = disconnected
client.on_message    = message
client.on_subscribe  = subscribe

# Connect to the Adafruit IO server.
client.connect()


# Start a message loop that blocks forever waiting for MQTT messages to be
# received.  Note there are other options for running the event loop like doing
# so in a background thread--see the mqtt_client.py example to learn more.
client.loop_blocking()