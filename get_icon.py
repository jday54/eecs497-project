# Generate png icon of desired size given icon of bigger size

import numpy as np
from PIL import Image  

user_input = int(input("Input size of new dimension (ie, type '16' for new size of 16x16).\n  Enter: "))
newsize = [user_input,user_input]
im = Image.open(r"icon.png")
im_new = im.resize(newsize)
new_fname = "icon_" + str(newsize[0]) + ".png"
im_new.save(new_fname)
