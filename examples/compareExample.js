


o1 = { v:"1"};
o2 = { v:"2"};
o3 = { v:"3"};
o4 = { v:"4"};
o5 = { v:"5"};


if(false){





    //splice like
    a = [o1, o2,o3, o4,o5] // len 5
    b = [o1, o2, {v:"6"}, {v:"7"}, o4,o5,]  // ln 6

    console.time("myCompare")
    console.log(myCompare(a,b))
    console.timeEnd("myCompare")
    console.time("minimalMovesToTransformArray")
    console.log(minimalMovesToTransformArray(a,b))
    console.timeEnd("minimalMovesToTransformArray")
    //delete one 
    a = [o1, o2,o3, o4,o5]
    b = [o1, o2, o4,o5,]  

    console.time("myCompare")
    console.log(myCompare(a,b))
    console.timeEnd("myCompare")
    console.time("minimalMovesToTransformArray")
    console.log(minimalMovesToTransformArray(a,b))
    console.timeEnd("minimalMovesToTransformArray")


    //same value twice 
    a = [o1, o2,o3, o4,o5]
    b = [o1, o2,o1 , o4,o5, o3]  
    console.time("myCompare")
    console.log(myCompare(a,b))
    console.timeEnd("myCompare")
    console.time("minimalMovesToTransformArray")
    console.log(minimalMovesToTransformArray(a,b))
    console.timeEnd("minimalMovesToTransformArray")

    //same value twice 
    a = [o1, o2,o4, o3, o4,o5]
    b = [o1, o2,o1 , o4,o5, o3]  
    console.time("myCompare")
    console.log(myCompare(a,b))
    console.timeEnd("myCompare")
    console.time("minimalMovesToTransformArray")
    console.log(minimalMovesToTransformArray(a,b))
    console.timeEnd("minimalMovesToTransformArray")


    a = []
    b = [o1, o2,o1 , o4,o5, o3]  
    console.time("myCompare")
    console.log(myCompare(a,b))
    console.timeEnd("myCompare")
    console.time("minimalMovesToTransformArray")
    console.log(minimalMovesToTransformArray(a,b))
    console.timeEnd("minimalMovesToTransformArray")

    a = [o1, o2,o4, o3, o4,o5]
    b = []  
    console.time("myCompare")
    console.log(myCompare(a,b))
    console.timeEnd("myCompare")
    console.time("minimalMovesToTransformArray")
    console.log(minimalMovesToTransformArray(a,b))
    console.timeEnd("minimalMovesToTransformArray")

    //reverse
    a = [o1, o2, o3, o4,o5]
    b = [  o5,o4,o2,o3,o1,]  
    console.time("myCompare")
    console.log(myCompare(a,b))
    console.timeEnd("myCompare")
    console.time("minimalMovesToTransformArray")
    console.log(minimalMovesToTransformArray(a,b))
    console.timeEnd("minimalMovesToTransformArray")


        //lon array 
        //myCompare is faster with long arrays since traverse only one time

    a = [ ...Array.from(Array(10000)),o1, o2,o4, o3, o4,o5]
    b = [...Array.from(Array(10000)), o1, o2,o1 , o4,o5, o3]  
    console.time("myCompare")
    console.log(myCompare(a,b))
    console.timeEnd("myCompare")
    console.time("minimalMovesToTransformArray")
    console.log(minimalMovesToTransformArray(a,b))
    console.timeEnd("minimalMovesToTransformArray")

    //add one
    a = [o1, o2,o4, o3, o4,o5]
    b = [o1, o2,o1 , o4,o5, o3, {"v":"6"}]  
    console.time("myCompare")
    console.log(myCompare(a,b))
    console.timeEnd("myCompare")
    console.time("minimalMovesToTransformArray")
    console.log(minimalMovesToTransformArray(a,b))
    console.timeEnd("minimalMovesToTransformArray")

    a = [o1, o2, o3, o4,o5]
    b = [o1, o2, o3, o4,o5, {"v":"6"}]  
    console.time("myCompare")
    console.log(myCompare(a,b))
    console.timeEnd("myCompare")
    console.time("minimalMovesToTransformArray")
    console.log(minimalMovesToTransformArray(a,b))
    console.timeEnd("minimalMovesToTransformArray")


    a = [o1, o2, o3, o4,o5]
    b = [o1, o2, o3,o2,o5,]  
    console.time("myCompare")
    console.log(myCompare(a,b))
    console.timeEnd("myCompare")
    console.time("minimalMovesToTransformArray")
    console.log(minimalMovesToTransformArray(a,b))
    console.timeEnd("minimalMovesToTransformArray")

    a = [o1, o2, o3, o4,o5]
    b = [o1, o2, o3,o5]  
    console.time("myCompare")
    console.log(myCompare(a,b))
    console.timeEnd("myCompare")


    a = [o1, o2, o3, o4,o5]
    b = [o1, o2, o3,o3 ] 
    console.log(myCompare(a,b))


}

