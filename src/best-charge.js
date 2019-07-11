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

// function getBarCodeList(tags){
// 	const barCodeList=tags.map((tag)=>{
// 		return tag.(" x ")[0];
// 	});
// 	return barCodeList;
// }

function getAppointPromotion(tags){
	const appointPromotion=loadPromotions()[1].items;
	// console.log(appointPromotion);
	let flag=0;
	let sum=0;
	// tags.forEach((tag)=>{
	// 	appointPromotion.forEach((item)=>{
	// 		if(tag.split(" x ")[0]===item){
	// 			flag=1;
	// 			const item=getItem(tag);
	// 			sum+=(item.price/2)*parseInt(tag.split(" x ")[1]);
	// 		}
	// 		else{
	// 			const item=getItem(tag);
	// 			sum+=item.price*parseInt(tag.split(" x ")[1]);
	// 		} 

	// 	});
	// });
	for(let tag in tags){
		let isPromotion=0;
		console.log(tags[tag].split(" x ")[0]);
		for(let barCode in appointPromotion){
			console.log(appointPromotion[barCode]);
			if(tags[tag].split(" x ")[0]===appointPromotion[barCode]){
				flag=1;
				isPromotion=1;
				const item=getItem(tags[tag]);
				sum+=(item.price/2)*parseInt(tag.split(" x ")[1]);
				break;
			}
		}
		if(isPromotion===0){
			const item=getItem(tags[tag]);
			sum+=(item.price)*parseInt(tag.split(" x ")[1]);
		}
	}
	console.log("指定"+sum);
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
		sum-=parseInt(sum/30)*6;
		// console.log("30-6:"+sum);
		return sum;
	}
	else return 0;
}

function getOldSum(tags){
	let sum=0;
	tags.forEach((tag)=>{
		const item=getItem(tag);
		sum+=item.price*parseInt(tag.split(" x ")[1]);
	});
	return sum;
}

function createMiddleString(tags){
	let middleString="";
	tags.forEach((tag)=>{
		const item=getItem(tag);
		let sum=item.price*parseInt(tag.split(" x ")[1]);
		middleString+=`${item.name} x ${tag.split(" x ")[1]} = ${sum}元\n`;
	});
	return middleString;
}

function getAppointPromotionItemName(){
	let appointPromotionItemName="";
	const appointPromotionItemBarcode=loadPromotions()[1].items;
	appointPromotionItemName=appointPromotionItemBarcode.map((barCode)=>{
		const item=getItem(barCode);
		return item.name;
	});
	
	return appointPromotionItemName.join("，");
}

function createCharge(selectedItems){
	let charge="============= 订餐明细 =============\n";
	charge+=createMiddleString(selectedItems);
	charge+="-----------------------------------\n";
	if(getFull30Minus6(selectedItems)===0&&getAppointPromotion(selectedItems)===0){
		charge+=`总计：${getOldSum(selectedItems)}元\n===================================`;
	}
	if(getFull30Minus6(selectedItems)!==0&&getAppointPromotion(selectedItems)!==0){
		    if(getFull30Minus6(selectedItems)<=getAppointPromotion(selectedItems)){
				charge+=`使用优惠:\n满30减6元，省${getOldSum(selectedItems)-getFull30Minus6(selectedItems)}元\n`;
				charge+=`-----------------------------------\n总计：${getFull30Minus6(selectedItems)}元\n===================================`;
			}
			else{
				charge+=`使用优惠:\n指定菜品半价(${getAppointPromotionItemName()})，省${getOldSum(selectedItems)-getAppointPromotion(selectedItems)}元\n`;
				charge+=`-----------------------------------\n总计：${getAppointPromotion(selectedItems)}元\n===================================`;
			}
	}
	if(getFull30Minus6(selectedItems)!==0&&getAppointPromotion(selectedItems)===0){
		charge+=`使用优惠:\n满30减6元，省${getOldSum(selectedItems)-getFull30Minus6(selectedItems)}元`;
		charge+=`-----------------------------------\n总计：${getFull30Minus6(selectedItems)}元\n===================================`;
	}
	if(getFull30Minus6(selectedItems)===0&&getAppointPromotion(selectedItems)!==0){
		charge+=`使用优惠:\n指定菜品半价(${getAppointPromotionItemName()})，省${getOldSum(selectedItems)-getAppointPromotion(selectedItems)}元\n`;
		charge+=`-----------------------------------\n总计：${getAppointPromotion(selectedItems)}元\n===================================`;
	}
  	return charge;
}
function bestCharge(selectedItems) {
	return createCharge(selectedItems);
}
