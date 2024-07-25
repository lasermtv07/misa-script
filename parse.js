var exp="hewwo+uwu(5+69+7)/owo(96/420+5)*a";
var tok=[];
//tokenize
function isLetter(i){
	let t=i.charCodeAt(0);
	if((t>=65 && t<=90) || (t>=97 && t<=122)) return true;
	else return false;
}
var ptok="";
for(let i=0;i<exp.length;i++){
	let n=exp[i];
	if(n!="+" && n!="-" && n!="*" && n!="/" && n!="%" && n!="(" && n!=")"){
		ptok+=n;
	}
	else {
		if(i>0 && n=="(" && isLetter(exp[i-1])){
			ptok+=n;
			tok.push(ptok);
			ptok="";
		}
		else {
			tok.push(ptok);
			tok.push(n);
			ptok="";
		}
	}

}
tok.push(ptok);
console.log(tok)
