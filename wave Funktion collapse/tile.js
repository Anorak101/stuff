class tile {
	constructor(pic,color,rotation,standartIndex,validTiles)
	{
		this.pic = pic;
		this.color = color;
		this.rotation = rotation;
		this.adjacency=[]
		this.standartIndex = standartIndex
		this.validTiles = validTiles
	}
	getImg() {
		return this.pic;
		}
	getRotation()
	{
		return this.rotation;
	}
	setRotation(rotation)
	{
		this.rotation = rotation;
	}
	getAdjecency(index)
	{
		return this.adjacency[index];
	}
	getColor()
	{
		return this.color;
	}
	generateAdjecency(allTiles)
	{	
		let up = []
		let right = []
		let down = []
		let left = []
		for(let i = 0; i < allTiles.length; i++) 
		{
			if(!this.validTiles.includes(allTiles[i].standartIndex)){continue;}
			
			if(this.color[0] === reverseString(allTiles[i].color[2]))
			{
				up.push(allTiles[i]);
			}
			
			if(this.color[1] === reverseString(allTiles[i].color[3]))
			{
				right.push(allTiles[i]);
			}
			
			if(this.color[2] === reverseString(allTiles[i].color[0]))
			{
				down.push(allTiles[i]);
			}
			
			if(this.color[3] === reverseString(allTiles[i].color[1]))
			{
				left.push(allTiles[i]);
			}
			
		}
		this.adjacency = [up,right,down,left];
	}

	removeTileFromAdjacency(indexDir, indexTiles) 
	{
		let adjacencyDir = this.adjacency[indexDir];
		adjacencyDir.splice(indexTiles, 1);

	}
	
}
function reverseString(text) 
{
  const chars = text.split("");
  chars.reverse();
  const temp = chars.join("");
  return temp; 
}