//TODO: fix broken strings (newline breaks them :/)
function ir(code){
	function parseArr(t){
		let tt=t.split("");
		tt.shift();
		tt.pop();
		tt=(tt.join("")).trim();
		let type='num';
		console.log(isNaN(tt.split(",")[0]))
		if(tt.split(",")[0]=="true" || tt.split(",")[0]==false) type='bool';
		else if(!isNaN(tt.split(",")[0])) type='num';
		else if(tt[0]=="'" || t[0]=='"') type='str';
		else throw new Error("[misaIR] Could not determine array type!");
		tt=tt.split(",");
		let o=[];
		for(let j of tt){
			j=j.trim();
			switch(type){
				case "bool":
					if(j=="true") o.push(1);
					else o.push(0);
					break;
				case "num":
					o.push(parseInt(j));
					break;
				case "str":
					j=j.split("");
					j.shift();
					j.pop();
					o.push(j.join(""));
			}
		}
		return {value:o,type:"arr<"+type+">"};
	}
	var l=code.split("\n");
	var labels=[];
	var stack=[];
	var vars=[{name:'a',value:5,type:'num'}];
	for(let i=0;i<l.length;i++){
		//console.log(l[i])
		let s=(l[i].trim()).split(" ");
		switch(s[0]){
			case 'label':
				labels.push({name:s[1],line:i});
				break;
			case 'let':
				//if doesnt exist add variable
				let w=true;
				for(let j of vars){
					if(j.name==s[1]) w=false;
				}
				if(w) vars.push({name:s[1],value:0,type:'num'});
				if(s.length>3 && s[2]=='='){
					let idx=0;
					for(let j=0;j<vars.length;j++){
						if(vars[j].name==s[1]) idx=j;
					}
					let t=s;
					t.shift();
					t.shift();
					t.shift();
					t=(t.join(" ")).trim();
					console.log(t)
					if(t=='true') vars[idx]={name:vars[idx].name,value:1,type:'bool'};
					else if(t=='false') vars[idx]={name:vars[idx].name,value:0,type:'bool'};
					else if(!isNaN(t)) vars[idx]={name:vars[idx].name,value:parseInt(t),type:'num'};
					else if(t[0]=='&'){
						let tt=t.split("");
						tt.shift();
						vars[idx]={name:vars[idx].name,value:tt.join(""),type:'ref'};
					}
					else if(t[0]=="'" || t[0]=='"'){
						let tt=t.split("");
						tt.shift();
						tt.pop();
						vars[idx]={name:vars[idx].name,value:tt.join(""),type:'str'};
					}
					else if(t[0]=='*'){
						t=t.split("");
						t.shift();
						t=t.join("");
						for(let j of vars){
							if(j.name==t) vars[idx]={name:vars[idx].name,value:j.value,type:j.type};
						}

					}
					else if(t[0]=="{"){
						let arr=parseArr(t)
						vars[idx]={name:vars[idx].name,value:arr.value,type:arr.type};
					}
				}
				break;
			case 'add':
			case 'sub':
			case 'mul':
			case 'div':
			case 'mod':
				let targ=s[1];
				let a=s[2];
				let b=s[3];
				let idx=-1;
				for(let j=0;j<vars.length;j++){
					if(vars[j].name==s[1]) idx=j;
				}
				if(idx==-1) throw new Error('[misaIR] Could not find variable');
				if(s.length<4) throw new Error('[misaIR] Insufficent number of call parameters');
				function parseVar(a){
					if(a[0]=='*'){
						a=a.split("");
						a.shift();
						a=a.join("");
						for(let j of vars){
							if(j.name==a && j.type=='num') a=parseInt(j.value);
						}
						if("*"+a==s[2]) throw new Error('[misaIR] Could not find variable');
					}
					else {
						a=parseInt(a);
						if(isNaN(a)) throw new Error('[misaIR] Error parsing integer');
					}
					return a;
				};
				a=parseVar(a);
				b=parseVar(b);
				if(s[0]=='add') vars[idx].value=a+b;
				if(s[0]=='sub') vars[idx].value=a-b;
				if(s[0]=='mul') vars[idx].value=a*b;
				if(s[0]=='div') vars[idx].value=a/b;
				if(s[0]=='mod') vars[idx].value=a%b;
				break;
			case 'push':
				let p=s[1].trim();
				if(p=='true') stack.push({value:1,type:'bool'});
				else if(p=='false') stack.push({value:0,type:'bool'});
				else if(!isNaN(parseInt(p))) stack.push({value:parseInt(p),type:'num'});
				else if(p[0]=='"' || p[0]=="'"){
					p=p.split("");
					p.shift();
					p.pop();
					stack.push({value:p.join(""),type:'str'});
				}
				else if(p[0]=='{'){
					let ar=parseArr(p);
					stack.push({value:ar.value,type:ar.type});
				}
				else if(p[0]=='*'){
					p=p.split("");
					p.shift();
					p=p.join("");
					for(let j of vars){
						if(j.name==p) stack.push(j);
					}
				}
				else if(p[0]=='&'){
					p=p.split("");
					p.shift();
					p=p.join("");
					let exist=false;
					for(let j of vars){
						if(j.name==p) exist=true;
					}
					if(exist) stack.push({name:p,type:'ref'});
					else throw new Error('[misaIR] Tried to reference nonexistent variable');
				}
				else throw new Error('[misaIR] Dont know what to push!');
				break;
		}
	}
	console.log(labels)
	console.log(vars)
	console.log(stack)
}
