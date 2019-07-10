function getItem(tag){
	const allItems=loadAllItems();
	let item;
	allItems.forEach((oneItems)=>{
		if(tag.split(" x ")[0]===oneItems.id){
			item=oneItems;
		}
	});
	return item;
}

function getBarCodeList(tags){
	const barCodeList=tags.map((tag)=>{
		return tag.(" x ")[0];
	});
	return barCodeList;
}

function getAppointPromotion(tags){
	const appointPromotion=loadPromotions()[1].items;
	let flag=0;
	let sum=0;
	tags.forEach((tag)=>{
		appointPromotion.forEach((item)=>{
			if(tag.split(" x ")[0]===item){
				flag=1;
				const item=getItem(tag);
				sum+=(item.price/2)*parseInt(tag.split(" x ")[1]);
			}
			else{
				const item=getItem(tag);
				sum+=item.price*parseInt(tag.split(" x ")[1]);
			} 

		});
	});
	if(flag==0) return 0;
	else {
		return sum;
	}
}

function getFull30Minus6(tags){
	let sum=0;
	tags.forEach((tag)=>{
		const item=getItem(tag);
		sum+=item.price*parseInt(tag.split(" x ")[1]);
	});
	if(sum>=30){
		sum-=parseInt(sum/3)*6;
	}
	else return 0;
}

function getOldSum(tags){

}
function bestCharge(selectedItems) {

  	return /*TODO*/;
}
