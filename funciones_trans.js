/*
 La geometría genera la forma  del objeto a partir de vértices. Los vertices se obtienen con el vector vx
 Para aplicar la geometría se una el THREE.Vector (returna en geon) */ 
function Geometria(vx){
    geon= new THREE.Geometry();
    for (let i = 0; i < vx.length; ++i) {
        x = vx[i][0];
        y = vx[i][1];
        z = vx[i][2];
        vector = new THREE.Vector3(x, y, z);
        geon.vertices.push(vector);
    }
    return geon;
}  
/*
 vt es  el vector traslación. Al meter los valoresde cada eje [] en la matríz, 
 se genera una matríz traslación con las  unidades que están en el vectotr (para x,y,z)
 */
function Traslation(vt) {
    var matriz = new THREE.Matrix4();
    matriz.set(1, 0, 0, vt[0],
            0, 1, 0, vt[1],
            0, 0, 1, vt[2],
            0, 0, 0, 1);
    return matriz;
}
/*
 vs es  el vector escalado. Al meter los valores de cada eje [] en la matríz, 
 se genera una matríz escala con las  unidades que están en el vectotor (para x,y,z)
 */
function Escalado(vs) {
    var matrizS = new THREE.Matrix4();
    matrizS.set(vs[0], 0, 0, 0,
            0, vs[1], 0, 0,
            0, 0, vs[2], 0,
            0, 0, 0, 1);
    return matrizS;
}
/*
 Es la  función para "actualizar" el objeto con el escalado (vs es el vector de escalado y vp la posición  inicial) 
 applyMatrix genera una matríz a partir de  los vectores que le damos   en  los parámetros
 */
function EscaladoReal(obj,vp,vs){
    vt= [-vp[0],-vp[1],-vp[2]]; //Se debe trasladar al origen para no dañar el escalado
    obj.applyMatrix(Traslation(vt)); 
    obj.applyMatrix(Escalado(vs));//Escalado
    obj.applyMatrix(Traslation(vp));// retorna a  la posción que estaba

}
/*
ar es el angulo para rotar sobre el ejea
 */
function Rotacionx(ar){
    var matrizRx = new THREE.Matrix4();
    var alpha = ar;
    var cs = Math.cos(alpha);
    var ss = Math.sin(alpha);

    matrizRx.set(1,  0, 0, 0, //rotacion en x (en rad)
                0,  cs, -ss, 0, 
                0, ss, cs, 0,
                0, 0, 0, 1);
    return matrizRx
}
/*
 ar es el angulo para rotar sobre el eje(y) (en rad)
 */
function Rotaciony(ar){
    var matrizRy = new THREE.Matrix4();
    var alpha = ar;
    var cs = Math.cos(alpha);
    var ss = Math.sin(alpha);

    matrizRy.set(cs,  0, ss, 0, //rotacion en y
                0,  1, 0, 0, 
                -ss, 0, cs, 0,
                0, 0, 0, 1);
    return matrizRy
}
/*
ar es el angulo para rotar sobre el eje (z) (en rad)
 */
function Rotacionz(ar){
    var matrizRz = new THREE.Matrix4();
    var alpha = ar;
    var cs = Math.cos(alpha);
    var ss = Math.sin(alpha);

    matrizRz.set(cs,  -ss, 0, 0, //rotacion en z
                ss,  cs, 0, 0, 
                0, 0, 1, 0,
                0, 0, 0, 1);
    return matrizRz
}
/*
 OBJETO: Objeto tipo THREE.line a ser rotado, ar=(angulo para rotar en radiandes),vp=(posicion inicial)
 primero  en x luego y y luego en z
 Para el escalado real se debe: 
 1) traslaciónal origen
 2) rotarlo
 3) escalarlo 
 4) Volverlo al punto inicial
 */

function RotacionRealx(obj,vp,ar,vs){
    vt= [-vp[0],-vp[1],-vp[2]]; 
    obj.applyMatrix(Traslation(vt)); 
    obj.applyMatrix(Rotacionx(ar));//Rotacion del obj
    obj.applyMatrix(Escalado(vs));
    obj.applyMatrix(Traslation(vp));
}
function RotacionRealy(obj,vp,ar,vs){
    vt= [-vp[0],-vp[1],-vp[2]]; 
    obj.applyMatrix(Traslation(vt)); 
    obj.applyMatrix(Rotaciony(ar));//Rotacion del objeto en y
    obj.applyMatrix(Escalado(vs));
    obj.applyMatrix(Traslation(vp));
}
function RotacionRealz(obj,vp,ar,vs){
    vt= [-vp[0],-vp[1],-vp[2]]; 
    obj.applyMatrix(Traslation(vt)); 
    obj.applyMatrix(Rotacionz(ar));//Rotacion del objeto en z
    obj.applyMatrix(Escalado(vs));
    obj.applyMatrix(Traslation(vp));
}


