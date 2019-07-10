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

function isAppointPromotion(barCodeList){
	const appointPromotion=loadPromotions()[1].items;
	let flag=0;
	barCodeList.forEach((barCode)=>{
		appointPromotion.forEach((item)=>{
			if(barCode===item) flag=1;
		});
	});
	if(flag==0) return false;
	else return true;
}

function bestCharge(selectedItems) {
	
  	return /*TODO*/;
}
