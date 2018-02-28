# Hungry Pumkin TAS

This requires the [**Flash Debug Player**](https://www.adobe.com/support/flashplayer/debug_downloads.html) with a correctly-configured [**mm.cfg**](https://help.adobe.com/en_US/flex/using/WS2db454920e96a9e51e63e3d11c0bf69084-7fc9.html) file.

The [**Hungry Pumkin**](http://2008.pumkin.com/) game outputs debug information which consists of the order of the foods to be presented, and each food that is requested. This script reads new lines from the **flashlog.txt** file and triggers keyboard events to navigate the Flash player using the **tab** and **space** keys. In the Flash player, the tab key cycles between selectable objects, and the space key activates the selected object. 