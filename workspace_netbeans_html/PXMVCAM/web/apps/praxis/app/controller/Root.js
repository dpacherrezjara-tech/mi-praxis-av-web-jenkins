/**
 * @author: remicioluis
 * --------------------
 * - Routing global
 * - Administra las peticiones url y carga de forma dinamica segun requerimientos
 */
var optionSelect = {};
var optionSelectDashboard = {};
var userAccess = [] ;
var accessSelect = {};

Ext.define('Ext.Praxis.controller.Root', {
    extend: 'Ext.app.Controller',
    requires: [
        'Ext.Praxis.view.main.Main'
    ],
    config: {
        routes: {
            ':id': {
                action: 'handleRoute',
                before: 'beforeHandleRoute'
            }
        }
    },
    beforeHandleRoute: function(id, action) {
        action.resume();
    },
    /**
     * Carga modulos de forma dinamica y segun requerimiento
     */
    handleRoute: function(id) {
        // console.log('Ingreso root....');
        // Get saved data from sessionStorage
        console.log('Begin sessionStorage');
        var data = sessionStorage.getItem('nprog');
        if(data!=null) optionSelect = { nprog: data };
        // Remove saved data from sessionStorage
        //sessionStorage.removeItem('nprog');
        //console.log(optionSelectDashboard);
        console.log('End sessionStorage');
        $('#menu').hide();
        var me1 = this;
        console.log('root nprog:'+nprog);
        if (nprog === '') {
            var moduleName = '';
            var nameSpace = '';

            Ext.each(id.split('-'), function(value, index) {
                if (index === 0)
                    moduleName = Ext.util.Format.lowercase(value);
                else {
                    nameSpace += me1.getNameSpace(value);
                }
            });
            var require = 'Ext.Praxis.view.' + moduleName + '.' + nameSpace + '.' + nameSpace;
            var contentPanel = Ext.getCmp('App-main-contenedor');

            if (Ext.String.trim(id) !== '') {

                var cmps = contentPanel.items.items;
                var flag = false;
                
                // console.log(cmps);

                // console.log(require);
                prototype.id = nameSpace;
                prototype.url = CONTEXTPATH+'/'+nameSpace.substr(0, nameSpace.indexOf("Form"));

                for (var i = 0; i < cmps.length; i++) {
                    var id2 = cmps[i].id.substring(0, cmps[i].id.indexOf('-'));

                    if (nameSpace === id2 && !flag) {
                        me = cmps[i].getController();
                        me.params = {};
                        me.NPROG = nprog;
                        cmps[i].show();
                        console.log('mostrarContenedor 1');
                        
                        $.each(userAccess, function(x, y) {
                            if (y.NPROG === optionSelect.nprog) {                
                                boAccess = false;
                                accessSelect = y;
                                console.log(boAccess);
                                console.log(optionSelect);                                                                                      
                            }
                        });
                        
                        me1.AccessControlRoot();
                        Ext.getCmp(id_main).getController().mostrarContenedor();
                        flag = true;
                    } else {
                        cmps[i].hide();
                    }
                }
                if (!flag) {
                    
                    if(userAccess.length===0){
                        //return;
                        $.ajax({
                            url: CONTEXTPATH + '/getAccessUser',
                            type: 'POST',
                            data: {'MTYPE': MTYPE},
                            dataType: 'json',
                            error: function(err) {
                                lg(err);
                            },
                            success: function(response) {
                                try {
                                    var boAccess = true;
                                    userAccess = response.data;
                                    console.log('begin optionSelect 4');
                                    console.log(userAccess);
                                    console.log(optionSelect);
                                    //console.log(optionSelectDashboard);
                                    console.log('end optionSelect 4');
                                    
                                    if(userAccess.length===0) return; // Sino tiene permisos, termina
                                    
                                    //if(optionSelect.nprog==null) return;
                                    $.each(userAccess, function(x, y) {
                                        if (y.NPROG === optionSelect.nprog) {                
                                            boAccess = false;
                                            accessSelect = y;
                                            console.log(boAccess);
                                            console.log(optionSelect);                                                                                      
                                        }
                                    });
                                    if(boAccess) { 
                                        global.Msg({
                                            msg: 'Access Denied',
                                            icon: 2,
                                            buttons: 1
                                        });
                                        return; // Sino tiene permiso, termina
                                    } else {
                                        Ext.Ajax.request({
                                            url: CONTEXTPATH + '/logAccessProgram',
                                            params: {nprog: optionSelect.nprog},
                                            success: function (response) {
                                                var res = Ext.decode(response.responseText);
                                                var success = res.success;
                                                if (success) {
                                                    //lg(response);                
                                                } else global.Msg({msg: res.sesion});
                                            }
                                        });
                                    };
                                    
                                    console.log('end optionSelect');
                                    
                                    Ext.require(require, function() {
                                        var className = Ext.ClassManager.getNameByAlias('widget.'+nameSpace);
                                        var ViewClass = Ext.ClassManager.get(className);
                                        var cmp = new ViewClass();
                                        me = cmp.getController();
                                        me.params = {};
                                        me.NPROG = nprog;
                                        console.log('mostrarContenedor 2');
                                        cmp.show();
                                        Ext.getCmp(id_main).getController().mostrarContenedor();
                                        contentPanel.add(cmp);
                                        
                                        me1.AccessControlRoot();
                                    });
                                    
                                } catch (err) {
                                    lg(err);                            
                                }
                            }
                        });                        
                    }
                    else
                    {
                        console.log('begin 3 optionSelect');
                        //optionSelectDashboard = { nprog : 'PX00000418'};
                        console.log(userAccess);
                        console.log(optionSelect);
                        //console.log(optionSelectDashboard);
                        if(userAccess.length===0) return; // Sino tiene permisos, termina
                        var boAccess = true;
                        $.each(userAccess, function(x, y) {
                            if (y.NPROG === optionSelect.nprog) {                
                                boAccess = false;
                                accessSelect = y;
                                console.log(boAccess);
                            }
                        });
                        /*$.each(userAccess, function(x, y) {
                            if (y.NPROG === optionSelectDashboard.nprog) {                
                                boAccess = false;
                                console.log(boAccess);
                            }
                        });*/
                        if(boAccess) { 
                            global.Msg({
                                msg: 'Access Denied',
                                icon: 2,
                                buttons: 1
                            });
                            return; // Sino tiene permiso, termina
                        }
                        console.log('end optionSelect 3');


                        Ext.require(require, function() {
                            var className = Ext.ClassManager.getNameByAlias('widget.'+nameSpace);
                            var ViewClass = Ext.ClassManager.get(className);
                            var cmp = new ViewClass();
                            me = cmp.getController();
                            me.params = {};
                            me.NPROG = nprog;
                            console.log('mostrarContenedor 3');
                            cmp.show();
                            Ext.getCmp(id_main).getController().mostrarContenedor();
                            contentPanel.add(cmp);
                            
                            me1.AccessControlRoot();
                        });
                    }
                    
                    
                }
            }
        }
    },
    getNameSpace: function(p) {
        var retorno = Ext.String.capitalize(p);
        var siglas = [
            'ACCB', 'ACM', 'ADJ', 'ADM', 'AP', 'AR', 'ARC', 'ASR', 'ATPCO', 'AVRA', 'BINES', 'BPO', 'BSP',
            'CAT', 'CCAM', 'DOT', 'DUP', 'EMD', 'FOB', 'GSA', 'HOT', 'IATA', 'ICH', 'IS', 'IDEC', 'ISR',
            'KMS', 'MCO', 'OAL', 'OCR', 'PMI', 'PMP', 'RAM', 'RATD', 'RFND', 'RM', 'SIS', 'SPA', 'SSIM',
            'TAX', 'TNU', 'TTBS', 'UATP', 'VCR', 'VNR', 'IT'
        ];
        var index = Ext.Array.indexOf(siglas, Ext.util.Format.uppercase(p));
        if (index >= 0)
            retorno = siglas[index];
        return retorno;
    },
    onLaunch: function() {
        this.showUI();
    },
    showUI: function() {
        this.viewport = new Ext.Praxis.view.main.Main({
        });
    },
    AccessControlRoot: function() {
        if(userAccess.length>0)
        {
            /*var plusItems = document.querySelectorAll('.prx-icon-add');
            var exportItems = document.querySelectorAll('.prx-icon-excel');
            if(plusItems === null) plusItems = [];
            if(exportItems === null) exportItems = [];
            console.log('AccessControlRoot');
            console.log(accessSelect);
            if(accessSelect.NPROG === "PX00000018") return;
            if(accessSelect.NPROG === "PX00000523") return;
            if(accessSelect.NPROG === "PX00000552") return;
            if(accessSelect.NPROG === "PX00000553") return;
            if(accessSelect.NPROG === "PX00000464") return;
            // PERML, PERMC, PERMM, PERME, PERMX
            if(accessSelect.PERMC==='N'){
                plusItems.forEach(function(plusItem) {
                    document.getElementById(plusItem.id).parentNode.parentNode.parentNode.style.display = 'none';
                });
            }else{
                plusItems.forEach(function(plusItem) {
                    document.getElementById(plusItem.id).parentNode.parentNode.parentNode.style.display = 'block';
                });
            }
            if(accessSelect.PERMX==='N'){
                exportItems.forEach(function(exportItem) {
                    document.getElementById(exportItem.id).parentNode.parentNode.parentNode.style.display = 'none';
              });
            }else{
                exportItems.forEach(function(exportItem) {
                    document.getElementById(exportItem.id).parentNode.parentNode.parentNode.style.display = 'block';
              });
            }*/
        }
    }

});