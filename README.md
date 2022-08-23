# comparis-properties
## Simplifications / Deviations from original task:

Due to personal time constraint, I have simplified the task slightly in the following ways, allowing me to get to a working prototype a bit quicker:

* Long/Lat flattened in JSON
* null replaced with 0 in the coordinates

## Suboptimal design choices I wouldn't do in a real production app which I did to save time/effort/inexperience with C#:

* load/parse JSON on every API call
* 