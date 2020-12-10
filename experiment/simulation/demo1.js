
document.getElementById('range').disabled = true;
document.getElementById('calc').disabled = true;
document.getElementById('add').disabled = true;
document.getElementById('pr').disabled = true;


jsPlumb.ready(function () {

    var instance,
        discs = [],

        addDisc = function (evt) {
            var info = createDisc();
            var e = prepare(info.id);
            instance.draggable(info.id);
            discs.push(info.id);
            evt.stopPropagation();
            evt.preventDefault();
        },

        reset = function (e) {
            for (var i = 0; i < discs.length; i++) {
                var d = document.getElementById(discs[i]);
                if (d) d.parentNode.removeChild(d);
            }
            discs = [];
            e.stopPropagation();
            e.preventDefault();
        },

        initAnimation = function (elId) {
            var el = document.getElementById(elId);

            instance.on(el, 'click', function (e, ui) {
                if (el.className.indexOf("jsPlumb_dragged") > -1) {
                    jsPlumb.removeClass(elId, "jsPlumb_dragged");
                    return;
                }
               
            });
        },

    // notice there are no dragOptions specified here, which is different from the
    // draggableConnectors2 demo.  all connections on this page are therefore
    // implicitly in the default scope.
         endpoint = {
            anchor: [0.5, 0.5, 0, -1],
            connectorStyle: { strokeWidth: 7, stroke: "rgba(198,89,30,0.7)" },
            endpointsOnTop: true,
            isSource: true,
            maxConnections: 10,
            isTarget: true,
            dropOptions: { tolerance: "touch", hoverClass: "dropHover" }
        },

        prepare = function (elId) {
            initAnimation(elId);

            return instance.addEndpoint(elId, endpoint);
        },

    // this is overridden by the YUI demo.
        createDisc = function () {
            var d = document.createElement("div");
            d.className = "bigdot";
            document.getElementById("animation-demo").appendChild(d);
            var id = '' + ((new Date().getTime()));
            d.setAttribute("id", id);
            var w = screen.width - 162, h = screen.height - 200;
            var x = (5 * w) + Math.floor(Math.random() * (10 * w));
            var y = (5 * h) + Math.floor(Math.random() * (10 * h));
            d.style.top = y + 'px';
            d.style.left = x + 'px';
            return {d: d, id: id};
        };

    // get a jsPlumb instance, setting some appropriate defaults and a Container.
    instance = jsPlumb.getInstance({
        DragOptions: { cursor: 'wait', zIndex: 20 },
        Endpoint: [ "Image", { url: "littledot.png" } ],
        Connector: [ "Bezier", { curviness: -90 } ],
        Container: "canvas"
    });

    // suspend drawing and initialise.
    instance.batch(function () {
        var e1 = prepare("ld1"),
            e2 = prepare("ld2"),
            e3 = prepare("ld3"),
            e4 = prepare("ld4"),
            e5 = prepare("ld5"),
            e6 = prepare("ld6"),
            e7 = prepare("ld7"),


           
            clearBtn = jsPlumb.getSelector("#anim-clear"),
            addBtn = jsPlumb.getSelector("#add");

         var detachLinks = jsPlumb.getSelector(".littledot .detach");
            instance.on(detachLinks, "click", function (e) {
                instance.deleteConnectionsForElement(this.getAttribute("rel"));
                jsPlumbUtil.consume(e);
            });

            instance.on(document.getElementById("clear"), "click", function (e) {
                instance.detachEveryConnection();
                showConnectionInfo("");
                jsPlumbUtil.consume(e);
            });
    });

    jsPlumb.fire("jsPlumbDemoLoaded", instance);

    document.getElementById("check-button").addEventListener("click", function () {
        //var d = instance.exportData();
        //console.log(instance.getAllConnections());

        var correct_connections_1_2 = [
            {
                "source": "ld1",
                "target": "ld2"
            },

            {
                "source": "ld2",
                "target": "ld1"
            }
        ];

        var correct_connections_3_4 = [
            {
                "source": "ld3",
                "target": "ld4"
            },

            {
                "source": "ld4",
                "target": "ld3"
            }
        ];        

        var correct_connections_4_6 = [
            {
                "source": "ld4",
                "target": "ld6"
            },
    
            {
                "source": "ld6",
                "target": "ld4"
            }
        ];

        var correct_connections_5_7 = [
            {
                "source": "ld5",
                "target": "ld7"
            },

            {
                "source": "ld7",
                "target": "ld5"
            }
        ];



        //a connection outside this will invalidate the circuit
        var allowed_connections = [
            {
                "source": "ld1",
                "target": "ld2"
            },
    
            {
                "source": "ld2",
                "target": "ld1"
            },
            
            {
                "source": "ld3",
                "target": "ld4"
            },

            {
                "source": "ld4",
                "target": "ld3"
            },

            {
                "source": "ld4",
                "target": "ld6"
            },

            {
                "source": "ld6",
                "target": "ld4"
            },

            {
                "source": "ld5",
                "target": "ld7"
            },

            {
                "source": "ld7",
                "target": "ld5"
            }
                ];

        var actual_connections = instance.getAllConnections();

        var is_connected_1_2 = false;
        var is_connected_3_4 = false;
        var is_connected_4_6 = false;
        var is_connected_5_7 = false;
		var unallowed_connection_present = false;
     

        //checking for 2_6 connection
        actual_connections.forEach(function (connection) {
            
            var this_connection = {
                "source": connection.sourceId,
                "target": connection.targetId
            };

            if(!is_connected_1_2){
                is_connected_1_2 = correct_connections_1_2.find(function (conn) {
                    return conn.source === this_connection.source && conn.target === this_connection.target;
                  });
            }

            if(!unallowed_connection_present){
                unallowed_connection_present = !(allowed_connections.find(function (conn) {
                    return (conn.source === this_connection.source && conn.target === this_connection.target);
                }));
            }
            // if this_connection exists in correct_connections
            // remove this connection from correct ones
            // continue
            // else
            // return false
        });

        //checking for 1_7 connection
        actual_connections.forEach(function (connection) {
            var this_connection = {
                "source": connection.sourceId,
                "target": connection.targetId
            };

            if(!is_connected_3_4){
                is_connected_3_4 = correct_connections_3_4.find(function (conn) {
                    return conn.source === this_connection.source && conn.target === this_connection.target;
                });
            }
              // if this_connection exists in correct_connections
            // remove this connection from correct ones
            // continue
            // else
            // return false
        });

        actual_connections.forEach(function (connection) {
            var this_connection = {
                "source": connection.sourceId,
                "target": connection.targetId
            };

            if(!is_connected_4_6){
                is_connected_4_6 = correct_connections_4_6.find(function (conn) {
                    return conn.source === this_connection.source && conn.target === this_connection.target;
                });
            }
              // if this_connection exists in correct_connections
            // remove this connection from correct ones
            // continue
            // else
            // return false
        });

        actual_connections.forEach(function (connection) {
            var this_connection = {
                "source": connection.sourceId,
                "target": connection.targetId
            };

            if(!is_connected_5_7){
                is_connected_5_7 = correct_connections_5_7.find(function (conn) {
                    return conn.source === this_connection.source && conn.target === this_connection.target;
                });
            }
              // if this_connection exists in correct_connections
            // remove this connection from correct ones
            // continue
            // else
            // return false
        });
		
        if (is_connected_1_2 && is_connected_3_4 && is_connected_4_6 && is_connected_5_7 && !unallowed_connection_present) {

            document.getElementById('range').disabled = false;
            document.getElementById('calc').disabled = false;
            document.getElementById('add').disabled = false;
            document.getElementById('pr').disabled = false;
            alert('correct connection')
            
            } else {
                // document.getElementById('range;').disabled = true;
               alert("WRONG CONNECTION Please Go through Instructions");
              
                return;
            } 
    });
});


        var n = 1;
        var xx = [];
        var yy = [];
        var E;
        var C;            
                function cal() {

                   E = parseFloat(document.getElementById("range").value);
					
					if(E!=0)
						{
							C=12;
						}
					else{
						
						C=0;
					}

                    document.getElementById("E").innerHTML = E.toFixed(3);
					
              }


                  function Add()
                  {
                   
                    var table = document.getElementById("mytable");


                    // Create an empty <tr> element and add it to the 1st position of the table:
                    var row = table.insertRow(-1);
                    // Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
                    var cell1 = row.insertCell(0);
                    var cell2 = row.insertCell(1);
                    var cell3 = row.insertCell(2);
                   

                   
                    cell1.innerHTML = n++;
                    cell2.innerHTML =E;
                    cell3.innerHTML =C;
                  }


                  

function dropdown() {
    document.getElementById("myDropdown").classList.toggle("show");
  }
  
  // Close the dropdown if the user clicks outside of it
  window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
  
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
  }
  
  function pr() {
  window.print();
  }