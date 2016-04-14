$(function(){ // on dom ready


var nodes=[];
var links=[];
var dropDown=[];
var nameToNode={};
 var viewNodes=[];
  var viewLinks=[];
  var rootNode='';
  var dijkstra ='';
  var pathToJ ='';
  var destinationNode='';
  var initialSearch =[];
  var firstNode=[];
  // var collection={};



 var mainData = d3.json("data/cardsWithContextData.json", function(error, data_) {
    data3 = data_;
    data3.forEach(function(d, index){
      if (index<1000) {
        var a = d.extracted_information.participant_a;
        var b = d.extracted_information.participant_b;
        var e = "";
        if (d.evidence){
            for (var i=0;i<1;i++){
                e+= " "+d.evidence[i];
            }
        }

        var type = d.extracted_information.interaction_type;

        var node1 = processNode(a);
        var node2 = processNode(b);
        var l = new Object();
        l.source = node1;
        l.target = node2; 
        l.type = type;

        l.name = node1.fields.entity_text+"__"+node2.fields.entity_text;

        if(type==="increases_activity")

       links.push({data:{source:node1.fields.entity_text, target:node2.fields.entity_text, type:type,source_type:node1.fields.entity_type,target_type:node2.fields.entity_type,linkColor:"red"}});
     else if(type==="decreases_activity")

       links.push({data:{source:node1.fields.entity_text, target:node2.fields.entity_text, type:type,source_type:node1.fields.entity_type,target_type:node2.fields.entity_type,linkColor:"blue"}});
      else if(type==="binds")

       links.push({data:{source:node1.fields.entity_text, target:node2.fields.entity_text, type:type,source_type:node1.fields.entity_type,target_type:node2.fields.entity_type,linkColor:"green"}});
      }
    });
    function processNode(fields){
        if (nameToNode[fields.entity_text]==undefined){
            var newNode = {};
            newNode.id = nodes.length;
            newNode.fields = fields;            
            newNode.neighbor= false;
            nodes.push({data:{id:newNode.fields.entity_text, entity_type:newNode.fields.entity_type, name:newNode.fields.entity_text}});
            nameToNode[fields.entity_text] = newNode;
            return newNode;
        }
        else{
            return nameToNode[fields.entity_text];
        }

    }
    console.log("Number of nodes: "+nodes.length);
    console.log("Number of links: "+links.length);

      // branching(nodes[86],links);
      
      console.log(nodes[90]);
      nodes.forEach(function(f){
        // debugger
        initialSearch.push({label:f.data.id});
        // debugger
      })
      // initialSearch= initialSearch.slice(0, 20);
      // debugger

// $("#search3").autocomplete({

//   source:initialSearch,
//   minLength:3
//   // debugger
// }).on( "autocompleteselect", function( enter ) {
//    var SelectedElement=document.getElementById('search3').value;
//    var selectedNode =  nodes.find(function(d){
//     if(d.data.id==SelectedElement)
//       return d;
//       // firstNode=firstNode.push(d);
//     // debugger
    
//    })
//    debugger
//  branching(selectedNode,links);

// });

function branching(node,links){
  var nodes = this;
  // var viewNodes=[];
  // var viewLinks=[];
  // debugger

 links.forEach(function(link) {
    if(link.data.source === node.data.id) {
      console.log("node.data.id= "+node.data.id);
      // debugger;
      viewLinks.push(link);
      
      viewNodes.push({data:{id:link.data.target, name:link.data.target, target_type:link.data.target_type}});
       
      viewNodes.push({data:{id:link.data.source, name:link.data.source, source_type:link.data.source_type}});

      // debugger

    }
   

    

    else if(link.data.target === node.data.id) {
       console.log("node.data.id= "+node.data.id);
      viewLinks.push(link);
     
       
      viewNodes.push({data:{id:link.data.source,name:link.data.source, source_type:link.data.source_type}});
      

      
      
      viewNodes.push({data:{id:link.data.target, name:link.data.target, target_type:link.data.target_type}});
        // debugger

  }
  
  })
 viewNodes.forEach(function(d){
 // debugger

 if(d.data.source_type==="protein" || d.data.target_type==="protein"){
  // debugger
  d.data.nodeShape = "rectangle";
  d.data.nodeColor="yellow";
 // debugger
  // prints "this is a string"
  console.log(d.data.propertyString);
 
  // also prints "this is a string"
  // I'm treating object as an associative array or hashtable
  // console.log(d.data["propertyString"]);
 
  // also prints "this is a string"
  // we can use variables as well to dynamically access keys.
  // var keyFromVariable = "propertyString";
  // console.log(myObject[keyFromVariable]);
 
  // // Couple of other examples.
  // console.log(myObject.propertyMixedArray[1]); // prints "item 2"
  // console.log(myObject.propertyObject.someProperty); // prints "and so on..."
  // console.log(myObject.additionalProperty); // prints "Additional property"
 }
 else{
  d.data.nodeShape="ellipse";
 d.data.nodeColor="#FC4C4C";
}
  // d.push(data.nodeshape="rectangle");
})
 // debugger
 //  var my_elements = {
 //    nodes: viewNodes,
 //    edges: viewLinks
    
 //  }
 // config.elements = my_elements;

 // viewNodes = viewNodes.forEach(function(n){
 //  if(n.)
 // })

 

// debugger
 }








var config = {
  container: document.getElementById('cy'),
  
  boxSelectionEnabled: false,
  autounselectify: true,
  
  style: cytoscape.stylesheet()
    .selector('node')
      .css({
        'height': 40,
        'width': 40,
        'background-fit': 'cover',
        'background-color':'data(nodeColor)',
        'color':'data(nodeColor)',
        'border-color': '#000',
        'shape':'data(nodeShape)',
        'content': 'data(name)',
        'border-width': 3,
        'border-opacity': 0.5,
        'text-outline-color': '#ccc',
        'text-outline-width': 3
      })
      .selector('.family')
      .css({
        'height': 10,
        'width': 10,
        'shape': 'rectangle',
        'text-outline-color': '#ccc',
        'text-outline-width': 3
      })
    .selector('.up')
      .css({
        'border-color': 'red'
      })
    .selector('.down')
      .css({
        'border-width': 9
      })
    .selector('edge')
      .css({
        'width': 6,
        'target-arrow-shape': 'triangle',
        'line-color': 'data(linkColor)',

        'target-arrow-color': '#ffaaaa'
      })
    .selector('.highlighted')
      .css({})
    .selector('.faded')
      .css({
        'background-opacity':0.3,
        'border-opacity':0,
        'opacity':0.1
      }),
  
  layout: {
    name: 'cose',
    directed: true,
    padding: 10
  }

 
}


// debugger;

  var my_elements = {
    nodes: viewNodes,
    edges: viewLinks
    
  }

console.log("elementer are" +my_elements);
  
  config.elements = my_elements;

  var cy = cytoscape(config);
  // var cy;
  
tapNode();
 


  
function tapNode(){
  cy.on('tap', 'node', function(e){
    // debugger
    cy.elements().removeClass('faded').addClass('highlighted');
  
    var node=e.cyTarget;

    // var nod=this.nodes;
    // console.log(node.cyTarget);
    var nodeId=node.id();
    var n=cy.getElementById(nodeId);
    n=n._private;
    // debugger
    branching(n,links);
    // cytoscape(config);
    cy.add(my_elements);
// cy=cytoscape(config);
debugger


 cy.layout({
   name: 'cose',
    directed: true,
    padding: 10
 });


    

    
    
     cy.nodes().forEach(function(z){
  // debugger
  dropDown.push(z._private.data.name);
   // dropDown=_.uniq(dropDown,false, function(d){return z._private.data.name});
   // debugger

})
     
// dropDown=_.uniq(dropDown,false, function(d){return true});


  })
}


// var root= document.getElementById('search').value
// var dropDown = cy.nodes();
cy.nodes().forEach(function(z){
  // debugger
  dropDown.push(z._private.data.name);
  // dropDown=_.uniq(dropDown,false, function(d){return z._private.data.name});
  // debugger

})
debugger

// dropDown=_.uniq(dropDown,false, function(d){return true});
// debugger
 $("#search").autocomplete({
  source:dropDown
}).on( "autocompleteselect", function( enter ) {
   rootNode='#'+document.getElementById('search').value;
 
   
   
   // _.uniq(viewNodes,false, function(d){return d.fields.entity_text});
  

} );
// debugger
$("#search2").autocomplete({
  source:dropDown
}).on( "autocompleteselect", function( enter ) {
   destinationNode='#'+document.getElementById('search2').value;
  dijkstra = cy.elements().dijkstra(rootNode, 1, true);

   pathToJ = dijkstra.pathTo(cy.$(destinationNode));
  highlight(pathToJ);
// debugger

} );
// debugger
$("#search3").autocomplete({

  source:initialSearch,
  minLength:3
  // debugger
}).on( "autocompleteselect", function( enter ) {
   var SelectedElement=document.getElementById('search3').value;
   var selectedNode =  nodes.find(function(d){
    if(d.data.id==SelectedElement)
      return d;
    
    
   })
   // debugger
 branching(selectedNode,links);
// cytoscape(config);
viewNodes;
viewLinks;
 // collection = cy.collection(viewNodes,viewLinks);


// var nhood = elements.neighborhood();
// var collection = cy.collection(nhood);

// collection=collection.add(node);
// collection= collection.add(viewLinks)
my_elements;
cy.add(my_elements);
// cy=cytoscape(config);
debugger


 cy.layout({
   name: 'cose',
    directed: true,
    padding: 10
 });
});

  
function highlight(pathToJ){
  cy.batch(function(){
    cy.elements().not(pathToJ).removeClass('highlighted').addClass('faded');
    pathToJ.removeClass('faded').addClass('highlighted');
  })
}

 cy.on('tap', function(e){
    // debugger
    cy.elements().removeClass('faded').addClass('highlighted');
  });

// $('#search').typeahead({
//     minLength: 2,
//     highlight: true,
//   },
//   {
//     name: 'search-dataset',
//     source: function( query, cb ){
//       function matches( str, q ){
//         str = (str || '').toLowerCase();
//         q = (q || '').toLowerCase();
        
//         return str.match( q );
//       }
//     }
//   }).on('typeahead:selected', function(e, entry, dataset){
//     var n = cy.getElementById(data.id);
//   });
      
//  $("#search3").autocomplete({

//   source:initialSearch,
//   minLength:3
//   // debugger
// }).on( "autocompleteselect", function( enter ) {
//    var SelectedElement=document.getElementById('search3').value;
//    var selectedNode =  nodes.find(function(d){
//     if(d.data.id==SelectedElement)
//       return d;
    
    
//    })
//    // debugger
//  branching(selectedNode,links);
// cytoscape(config);
//  cy.layout();
// });

});


// function onTapNodes() {
//   var nodes = this;
//   var tapped = nodes;
//   var food = [];
  
//   nodes.addClass('down');
  
//   for(;;){
//     var connectedEdges = nodes.connectedEdges(function(){
//       console.log(!this.target().anySame( nodes ))
//       return !this.target().anySame( nodes );
//     });
    
//     var connectedNodes = connectedEdges.targets();
    
//     Array.prototype.push.apply( food, connectedNodes );
    
//     nodes = connectedNodes;
    
//     if( nodes.empty() ){ break; }
//   }
        
//   var delay = 0;
//   var duration = 500;
//   for( var i = food.length - 1; i >= 0; i-- ){ (function(){
//     var thisFood = food[i];
//     var eater = thisFood.connectedEdges(function(){
//       return this.target().same(thisFood);
//     }).source();
            
//     thisFood.delay( delay, function(){
//       eater.addClass('eating');
//     } ).animate({
//       position: eater.position(),
//       css: {
//         'width': 10,
//         'height': 10,
//         'border-width': 0,
//         'opacity': 0
//       }
//     }, {
//       duration: duration,
//       complete: function(){
//         thisFood.remove();
//       }
//     });
    
//     delay += duration;
//   })(); } // for
// }



}); // on dom ready
// });