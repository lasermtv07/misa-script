function ir(code){
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
						console.log(type)
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
						vars[idx]={name:vars[idx].name,value:o,type:"arr<"+type+">"};
					}
				}
				break;
		}
	}
	console.log(labels)
	console.log(vars)
}
