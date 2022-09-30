class tile {
constructor(pic,colors,rotation)
{
	this.pic = pic;
	this.colors = colors;
	this.rotation = rotation;
}
getImg() {
	return this.pic;
	}
getColor() {
	return this.colors;
}
getRotation()
{
	return this.rotation;
}
}

