
# Final Project

* Author: Drew Rizk
* Class: CS402
* Semester: Spring 2024


## Project Description

For this assignment we created a Camera App using React Native that can add and remove snaps/pics from a photo gallery, as well as switch layouts upon button click. It can also share images and store them to camera roll. 

## Project semester and year

Spring Semester, 2024

## Running the program
Program should run automatically when ran in expo on a mobile device option. Alternatively, you can scan the barcode and view on mobile in expo go.

## General Reflection 

First, I made sure to get the camera working. This wasn't too bad to do, as I just went in and replaced all instances of MapView with Camera (like you suggested to do in class),
and that, along with a few more small edits, was able to allow me to get the camera working. I then got the styling of the Snap, Remove, Share, and Switch buttons how I wanted, and placed them under the camera. I personally liked having all of those buttons up there, and then just the Prev and Next buttons inside the View component (whether that be the preview view or the grid view). The next thing that came to mind was to start getting the snap working, to the point that I could store images. This was challenging, as I at first wasn't using a state variable to track this. After I switched to using a state variable to represent the list of photos, things became much more simple. I then just had to make sure I stored the photos correctly with their URI, and configure the alternate view (the grid view). If I didn't mention, I got everything working
with the preview view first, and then finished up by working on the grid view.

Deleting and adding images, mainly deleting, caused me to pull my hair out a bit, as at first it was deleting the oldest image. I think it was caused by the way I was adding the images using spanning techniques. Eventually, 
I found the shift() method which removes the first entry from a list (vs. pop() that removes the most recent). And, because I was storing photos in reverse order, this ended up deleting the most recent one, if that makes sense. Kind of backwards, but it works. I could've implemented a toggle for the list of photos within the grid, but I didn't, I figured my implementation made enough sense. However, had I worked on this longer, that would be something that I would look into adding, as it could be pretty clean being able to choose which photos you want to delete.

For the share functionality, what made the most sense to me is sharing the current taken image. I figured if a user liked the image, they would want to save it / share it right then and there. I'm not sure if the implementation was
supposed to differ from that of deliverable #5 (i.e. "Use the built in device sharing mechanism to let the user share the image"), but my share method allows for the user to either save the current picture to their camera roll, and it also allows them to share it to other people.

A bug exists that I couldn't figure out, and it happens when all pictures are deleted while in preview mode. The bug is that it still shows the most recent picture. This bug only exists on mobile, the re-render does fine 
on the web, which made the bug very confusing to research. Why would it work on one and not the other? When I tested on Android, this issue didn't happen. So, interestingly enough, this could be an IOS specific issue...
 







