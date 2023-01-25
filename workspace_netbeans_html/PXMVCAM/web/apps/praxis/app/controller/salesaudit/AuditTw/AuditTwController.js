/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
        
Ext.define('Ext.Praxis.controller.salesaudit.AuditTw.AuditTwController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.AuditTwController',
    fecha: new Date(),
    drillDown: [],
    gridActual: '',
    orderbyEtiquetas: '',
    me: '',
    searchParams: {},
    paramsDetail: {},
    gridProviderDynamic: [],
    listaCampos : [],
    AllComentariosAC: [],
    txtNameQuery: '',
    txtNameQuery1: '',
    txtDescQuery: '',
    init: function(view) {
        console.log('AuditTwForm');
        prototype.id = 'AuditTwForm';
        prototype.url = CONTEXTPATH + '/AuditTw';
        me = this;
        
        this.control({
            // -------------------Eventos Genericos --------------------
            '#AuditTwForm-xpanel': {
                afterrender: this.xpanel_afterrender
            }
            ,
            '#AuditTwForm-btnSearch': {
                click: this.btnSearch_click
            },
            '#AuditTwForm-btnClear': {
                click: this.btnClear_click
            },
            '#AuditTwForm-btnExcel': {
                click: this.btnExcel_click
            },
            '#AuditTwForm-btnTxt': {
                click: this.btnTXT_click
            },
            '#AuditTwForm-btnFilter': {
                click: this.btnFilter_click
            },
//            '#AuditTwForm-btnDisplay': {
//                click: this.btnDisplay_click
//            },
            '#AuditTwForm-btnBack': {
                click: this.btnBack_click
            },
            '#AuditTwForm-btn-pag-first': {
                click: this.pagFirst
            },
            '#AuditTwForm-btn-pag-previous': {
                click: this.pagPrevious
            },
            '#AuditTwForm-btn-pag-next': {
                click: this.pagNext
            },
            '#AuditTwForm-btn-pag-last': {
                click: this.pagLast
            },
            '#AuditTwForm-imgInfo': {
                click: this.onClickImgInfo
            },
            '#AuditTwForm-imgSave': {
                click: this.onClickImgSave
            },
            '#AuditTwForm-cmbFav': {
                select: this.onSelectCmbFav
            },
            '#AuditTwForm-imgBuild': {
                click: this.onClickImgBuild
            }





        });
    },
    xpanel_afterrender: function(obj, e) {

        console.log("Inicio Controller");
        this.startDisplay();
        //win.lblUser_toolTip("Estructura: CAF020");
        // this.btnSearch_click();
    },
    showGridActual: function() {
        this.hideAllGrid();
        Ext.getCmp(prototype.id + this.gridActual).show();
    },
    hideAllGrid: function() {
        if(Ext.getCmp(prototype.id + '-gridData')){
            Ext.getCmp(prototype.id + '-gridData').hide();
        }
    },
    PintarSave: function() {
        
	me.txtNameQuery = '';
	me.txtDescQuery = '';
        
        var cmbFav = Ext.getCmp(prototype.id + '-cmbFav').getValue();
        var record  = Ext.getCmp(prototype.id + '-cmbFav').findRecordByValue(cmbFav);
        var CodQuery = record.data.CodQuery;
        var helper = record.data.helper;
        
	if(CodQuery !== ''){
		var cod = CodQuery;
		var pos = cod.indexOf('-');
		me.txtNameQuery = cod.substring(pos+1);
		me.txtDescQuery = helper;
	}
        
    },
    Load: function() {
        
        var cmbFav = Ext.getCmp(prototype.id + '-cmbFav').getValue();
        
        console.log('Load');
        
        var record  = Ext.getCmp(prototype.id + '-cmbFav').findRecordByValue(cmbFav);
        var TabJoin = record.data.TabJoin;
        var CodQuery = record.data.CodQuery;
        
        if(cmbFav !== ''){
            
            Ext.getCmp(prototype.id + '-gridData').getStore().removeAll();
            Ext.getCmp(prototype.id + '-paggin').getStore().removeAll();
            me.printPagination('Y');
            
            var arr2 = Ext.getCmp(prototype.id + '-panelListColumns');
            arr2.getStore().removeAll();
            
            
            //Traer lista de campos para ser seleccionados
//            roBwrAuditTW.obtainData("A1672", cmbFav.selectedItem.TabJoin);
		
            me.obtainData('A1672', TabJoin, '');
		
//		//Lista guardada de campos en Favoritos
//		setTimeout(function():void{
//			roBwrAuditTW.obtainDataFavoritos("A1672", cmbFav.selectedItem.CodQuery,'');
//		}, 500);
            
            setTimeout(function() {
                    me.obtainDataFavoritos("A1672", CodQuery,'');
            }, 1200);
            
        }
        me.PintarSave();
    },
    
    onClickImgBuild: function() {
        
        var vPanel = Ext.getCmp(prototype.id + '-panelSelectField');
        
        var vgridData = Ext.getCmp(prototype.id + '-gridData');
        var vpanelResult = Ext.getCmp(prototype.id + '-panelResult');
        var vpanelPag = Ext.getCmp(prototype.id + '-piePanel');
        
        if(vPanel.isVisible()){
            vgridData.setWidth(1200)
            vPanel.setVisible(false);
        }else{
            vgridData.setWidth(600)
            vPanel.setVisible(true);
        }
        /*Ext.getCmp(prototype.id + '-campo' + (i + 1)).hide();
        Ext.getCmp(prototype.id + '-panelLabelPagination').show();*/
        
    },
    onClickImgInfo: function() {

        var tabla = Ext.getCmp(prototype.id + 'cmbFunction').getValue();
         var tabla2 = Ext.getCmp(prototype.id + '-cmbTabla2').getValue();
        Ext.create('Ext.Praxis.view.salesaudit.AuditTwForm.DataEntryHelp', {
            id: prototype.id + '-dataEntryHelp',
            params: {
                tabla: tabla,
                tabla2: tabla2
            }
        }).show();
    },
    onClickImgSave: function() {

        
        var tabla = Ext.getCmp(prototype.id + '-cmbFunction').getValue();
        Ext.create('Ext.Praxis.view.salesaudit.AuditTwForm.DataEntrySaveQuery', {
            id: prototype.id + '-dataEntrySaveQuery',
            params: {
                strSQL: me.searchParams.strSQL,
                tabla: tabla,
                tabla2: '',
                txtNameQuery : me.txtNameQuery,
                txtNameQuery1 : me.txtNameQuery1,
                txtDescQuery : me.txtDescQuery
            }
        }).show();
    },
    ChangeFunction: function(args, obj ,newValue , oldValue , event ) {
        console.log('ChangeFunction');
        console.log('1-' +obj + ' =====' + args + '······newValue=' + newValue + '?????oldValue=' + oldValue + 'FIN' + event + '<----');
        
	me.txtNameQuery = '';
	me.txtDescQuery = '';
	me.txtNameQuery1 = newValue + '-'  ;
        
        //console.log(value);
        if (newValue !== '#') {
            
//            Ext.getCmp(prototype.id + '-contentInfo').mask('Loading...');

            Ext.getCmp(prototype.id + '-gridData').getStore().removeAll();
            Ext.getCmp(prototype.id + '-paggin').getStore().removeAll();
            me.printPagination('Y');
            
            var arr2 = Ext.getCmp(prototype.id + '-panelListColumns');
            arr2.getStore().removeAll();

//            if (Ext.getCmp(prototype.id + '-gridData')) {
//                Ext.getCmp(prototype.id + '-gridData').destroy();
//            }

            //en el controlador de Savequery
//            Ext.getCmp(prototype.id + '-txtNameQuery').setValue('');
//            Ext.getCmp(prototype.id + '-txtDescQuery').setValue('');
//            Ext.getCmp(prototype.id + '-txtNameQuery1').setValue(Ext.getCmp(prototype.id + '-cmbFunction').getValue() + '-');

            Ext.getCmp(prototype.id + '-hbFavoritos').show();
            Ext.getCmp(prototype.id + '-BoxApply').show();
            
            Ext.getCmp(prototype.id + '-BoxComentario').hide();
            Ext.getCmp(prototype.id + '-BoxADM').hide();
            Ext.getCmp(prototype.id + '-BoxUK').hide();
            Ext.getCmp(prototype.id + '-BoxUpFromExcel').hide();
            Ext.getCmp(prototype.id + '-BoxXO').hide();
            Ext.getCmp(prototype.id + '-BoxUpFromExcelF31').hide();
            
            
            Ext.getCmp(prototype.id + '-txtComentario').setValue('');
            
            var TabJoin = '';
            var CodQuery = '';
        
            console.log(newValue);
            if(newValue === 'FARE'){
		TabJoin = "A1580";
		CodQuery = "FARE";	
                
//		with(BoxUpdateFareBase){visible = false; includeInLayout = false};
            }else if(newValue === 'TAX'){	
		TabJoin = 'A1673';
		CodQuery = 'TAX';
                Ext.getCmp(prototype.id + '-BoxComentario').show();
//                Ext.getCmp(prototype.id + '-BoxComentario').hide();

            }else if(newValue === 'XO'){	
		TabJoin = "A1673";
		CodQuery = "XO";
                Ext.getCmp(prototype.id + '-BoxXO').show();
                Ext.getCmp(prototype.id + '-BoxComentario').hide();
//		with(BoxUpdateFareBase){visible = false; includeInLayout = false};
            }else if(newValue === 'ADM'){	
                
            
		TabJoin = 'A1673';
		CodQuery = 'ADM';
                
		me.obtainRelacionComentarios();
                Ext.getCmp(prototype.id + '-BoxADM').show();
                Ext.getCmp(prototype.id + '-BoxComentario').hide();
//		with(BoxUpdateFareBase){visible = false; includeInLayout = false};
            }else if(newValue === 'FBASIS'){	
                
		TabJoin = '';
		CodQuery = 'FBASIS';
                
            }else if(newValue === 'UK'){
		TabJoin = 'A3101';
		CodQuery = 'UK';
                Ext.getCmp(prototype.id + '-BoxUK').show();
//		with(BoxUpdateFareBase){visible = false; includeInLayout = false};
            }else if(newValue === 'FORCE'){	
		TabJoin = 'A2657';
		CodQuery = 'FORCE';
                
                Ext.getCmp(prototype.id + '-BoxUpFromExcel').show();
//		with(BoxUpdateFareBase){visible = false; includeInLayout = false};
            }else if(newValue === 'F31'){		
		TabJoin = '';
		CodQuery = 'F31';
                
                Ext.getCmp(prototype.id + '-BoxApply').hide();
                Ext.getCmp(prototype.id + '-BoxUpFromExcelF31').show();
            }else{
		TabJoin = '';
		CodQuery = 'DEFAULT';
                
                Ext.getCmp(prototype.id + '-BoxApply').hide();
                Ext.getCmp(prototype.id + '-hbFavoritos').hide();
            }
                    
            
            //Lista de Favoritos
            me.obtainListFavoritos("A1672");
            
            Ext.getCmp(prototype.id + '-cmbTabla2').setValue(TabJoin);
            
            me.obtainData('A1672', TabJoin, '');
            
            
            //Lista guardada de campos en Favoritos
            setTimeout(function() {
                    me.obtainDataFavoritos("A1672", CodQuery,'DEFAULT');
            }, 1200);
//            this.changeFile(args, 0);

//            Ext.getCmp(prototype.id + '-contentInfo').unmask('Loading...');
        }
    },
    Apply: function(comentario, obj ,newValue , oldValue , event ) {
        console.log(me.searchParams);
        console.log('Apply --->' + comentario);
        var cmbFunction = Ext.getCmp(prototype.id + '-cmbFunction').getValue();
        
        var msj = '';
        var url = '';
        
        if(cmbFunction === 'XO'){
            me.searchParams.strSQLUpdateCampo = 'A1673';
            me.searchParams.strSQLUpdateCampo = comentario;
            
            msj = 'Are you sure update amount for this Taxes XO?';
            if(comentario === 'VIEW'){
                    msj = 'Are you sure check this tkts Taxes XO?';
            }
            
            url = 'ProcessTaxesXO';
        }else if(cmbFunction === 'UK'){
            me.searchParams.strSQLUpdateCampo = 'A1673';
		//beanQuery.IN_TXMIA = Number(txtTXMIA.text);
		//beanQuery.chkGroup = chkGDS.selected;
            
            me.searchParams.IN_CDTAX =  Ext.getCmp(prototype.id + '-txtCDTAX').getValue();
            me.searchParams.IN_MONED =  Ext.getCmp(prototype.id + '-txtMONED').getValue();
            me.searchParams.strCampo =  Ext.getCmp(prototype.id + '-cmbUK').getValue();

            msj = 'Are you sure to create UK Taxes?';

            url = 'CreateTaxesUK';
        }else if(cmbFunction === 'FORCE'){	
            me.searchParams.strSQLUpdateCampo = 'A2657';
            msj = 'Are you sure Force Match this Tickets?';

            url = 'ForseMatch';
        }
        console.log(msj);
        
        if(url !== ''){
            Ext.MessageBox.show({
                title: 'Icon Support',
                msg:  msj,
                buttons: Ext.MessageBox.OKCANCEL,
                icon: Ext.MessageBox.WARNING,
                fn: function(btn){
                    if(btn === 'ok'){
                        me.ApplyFunction(url);
                    } else {
                        return;
                    }
                }
            });
        }
        
        
    },
    ApplyFunction: function(url) {
//        
//         global.Msg({
//            msg: url
//        });
        
        console.log(me.searchParams);
        
        
         Ext.Ajax.request({
            url: prototype.url + '/' + url,
            params: {beanString : JSON.stringify(me.searchParams)},
            method: 'POST',
            beforerequest: Ext.getCmp(prototype.id + '-contentInfo').mask('Loading...'),
            success: function(response, options) {
                Ext.getCmp(prototype.id + '-contentInfo').unmask('Loading...');

                var res = Ext.JSON.decode(response.responseText);
                
                        global.Msg({
                            msg: res.mensaje
                        });
                
        }});
        
    },
    obtainListFavoritos: function(tabla) {
        
        var v_grupo ='';
        Ext.Ajax.request({
            url: prototype.url + '/obtainListFavoritos',
            params: {tabla:tabla},
            method: 'POST',
            beforerequest: Ext.getCmp(prototype.id + '-gridDataColumns').mask('Loading...'),
            success: function(response, options) {
                Ext.getCmp(prototype.id + '-gridDataColumns').unmask('Loading...');

                var res = Ext.JSON.decode(response.responseText);
                var resFav = res.lstFavoritos;
                
                
                var listaFav = [];
                listaFav.push({CodQuery: "", label: "Select", helper: ""});
                for (var i = 0; i < resFav.length; i++) {
                    var datos = {};
                    if(resFav[i].strCodigo.indexOf(Ext.getCmp(prototype.id + '-cmbFunction').getValue()) >= 0 ){
                        datos = {
                            CodQuery: resFav[i].strCodigo,
                            label: resFav[i].strCodigo + ' - ' + resFav[i].strDescrip,
                            helper: resFav[i].strDescrip,
                            TabJoin:resFav[i].IN_TABLA2
                        };
                        listaFav.push(datos);
                    }
                }
                var storeData = Ext.create('Ext.data.Store', {
                    data: listaFav,
                    autoLoad: true
                });
                
                Ext.getCmp(prototype.id + '-cmbFav').bindStore(storeData);//
                Ext.getCmp(prototype.id + '-cmbFav').setValue(listaFav[0].code);
                
//                console.log(Ext.getCmp(prototype.id + '-gridComment'));
                
            }});
        
    },
    obtainDataFavoritos: function(tabla, CodQuery,flag) {
        var twait = 1000;
        var v_grupo ='';
        Ext.Ajax.request({
            url: prototype.url + '/obtainDataFavoritos',
            params: {tabla:tabla,codigo:CodQuery,flag:flag},
            method: 'POST',
            beforerequest: Ext.getCmp(prototype.id + '-contentInfo').mask('Loading...'),
            success: function(response, options) {
//                Ext.getCmp(prototype.id + '-contentInfo').unmask('Loading...');

                    storeList.removeAll();
                    var resP = Ext.JSON.decode(response.responseText);
                    res = resP.lstFavoritos;
                    
//                    if (res[0].IN_TABLA2.trim() !== '') {
//                        Ext.getCmp(prototype.id + '-cmbTabla2').setValue(res[0].IN_TABLA2.trim());
////                        prototype.ChangeFile('Secundario', 1);
//                        me.changeFile('Secundario', 1);
//                        twait = 3000;
//                    }

                    
                    setTimeout(function() {
                        //Armo data que regreso de Favoritos
                        var arr1 = Ext.getCmp(prototype.id + '-gridDataColumns').getStore();
                        var list = [];
                        for (var j = 0; j < arr1.data.items.length; j++) {
                            var data = arr1.data.items[j].data;
                            data.select = false;
                            data.check = true;
                            data.OrderBy = '';
                            data.DownUp = 'ASC';

                        }
                        for (var i = 0; i < res.length; i++) {
                            var obj = res[i];
                            for (var j = 0; j < arr1.data.items.length; j++) {
                                var data = arr1.data.items[j].data;
                                if (data.campo === obj.strCampo) {
                                    data.select = true;
                                    data.check = true;
                                    data.OrderBy = obj.strOrderBy;
                                    data.DownUp = obj.strAscDesc === 1 ? 'DESC' : 'ASC';
                                    data.ordenCol = obj.orden;
                                    storeList.add(data);
                                    break;
                                }
                            }
                        }
                        for (var j = 0; j < arr1.data.items.length; j++) {
                            list.push(arr1.data.items[j].data);
                        }

                        var storeData = Ext.create('Ext.data.Store', {
                            data: list,
                            autoLoad: true
                        });
                        Ext.getCmp(prototype.id + '-gridDataColumns').bindStore(storeData);
//                        Ext.getCmp(prototype.id + '-chkSelGB').setValue(res[0].chkGroup);
                        me.displayQuery(res[0].strSQL);
                        Ext.getCmp(prototype.id + '-cmbTipoFecha').setValue(res[0].strFecha.trim());
    //                    me.btnSearch_click();

                    }, twait);
                }
            });
       
    },
    obtainRelacionComentarios: function() {
        
        var v_grupo ='';
        Ext.Ajax.request({
            url: prototype.url + '/obtainRelacionComentarios',
//            params: {},
            method: 'POST',
            beforerequest: Ext.getCmp(prototype.id + '-gridDataColumns').mask('Loading...'),
            success: function(response, options) {
                Ext.getCmp(prototype.id + '-gridDataColumns').unmask('Loading...');

                var res = Ext.JSON.decode(response.responseText);
                var AllComentariosAC = res.lstRelacionCom;
                me.AllComentariosAC  = AllComentariosAC;
                
                var cmbRelaComAC = [];
                var ComentariosGrillaAC = [];
                cmbRelaComAC.push({data: "",label:"All"});

                for (var i = 0; i < AllComentariosAC.length; i++) {
                    
                    ComentariosGrillaAC.push({codigo: AllComentariosAC[i].strCodigo,grupo: AllComentariosAC[i].strDescrip,label: AllComentariosAC[i].strComentario});
                    if(v_grupo !==  AllComentariosAC[i].strDescrip){
                        cmbRelaComAC.push({data: AllComentariosAC[i].strDescrip,label: AllComentariosAC[i].strDescrip});
                    }
                    
                    v_grupo = AllComentariosAC[i].strDescrip;
                }
                var storeData = Ext.create('Ext.data.Store', {
                    data: cmbRelaComAC,
                    autoLoad: true
                });
                Ext.getCmp(prototype.id + '-cmbRelacionCom').bindStore(storeData);//
                Ext.getCmp(prototype.id + '-cmbRelacionCom').setValue('');
                
                var storeDataGrid = Ext.create('Ext.data.Store', {
                    fields: ['data'],
                    data: ComentariosGrillaAC,
                    autoLoad: true
                });
                
                Ext.getCmp(prototype.id + '-gridComment').bindStore(storeDataGrid);//
                
//                console.log(Ext.getCmp(prototype.id + '-gridComment'));
                
                
            }});
        
    },
    ChangeRelaComment: function( obj ,newValue , oldValue , event ) {
        console.log('ChangeRelaComment');
        var v_cmbRelacionCom = Ext.getCmp(prototype.id + '-cmbRelacionCom').getValue();
	var flag = false;
        
        Ext.getCmp(prototype.id + '-gridComment').getStore().removeAll();
        Ext.getCmp(prototype.id + '-gridComment').getStore().sync();
        var ComentariosGrillaAC = [];
        for (var i = 0; i < me.AllComentariosAC.length; i++) {
            var objCampo = me.AllComentariosAC[i];
            
            if(v_cmbRelacionCom === ''){
                ComentariosGrillaAC.push({codigo: objCampo.strCodigo,grupo: objCampo.strDescrip,label: objCampo.strComentario});
            }else{
                if(objCampo.strDescrip === v_cmbRelacionCom){
                    //Los listo si es que no estan en la Lista a guardar
                    var ComentariosSaveAC = Ext.getCmp(prototype.id + '-gridComment').getStore().data.items;
                    if(ComentariosSaveAC.length>0){
                            for(var j = 0; j < ComentariosSaveAC.length; j++){
                                    if(ComentariosSaveAC[j].codigo == objCampo.strCodigo){
                                            flag=true;
                                    }
                            }
                    }
                    if(!flag){
                        ComentariosGrillaAC.push({codigo: objCampo.strCodigo,grupo: objCampo.strDescrip,label: objCampo.strComentario});
                    }
                }
            }
            
        }
        
        var storeDataGrid = Ext.create('Ext.data.Store', {
            fields: ['data'],
            data: ComentariosGrillaAC,
            autoLoad: true
        });

        Ext.getCmp(prototype.id + '-gridComment').bindStore(storeDataGrid);//
//        Ext.getCmp(prototype.id + '-gridComment').getStore().load();
    },
    BorrarCelda: function(obj ) {
         console.log('BorrarCelda');
         console.log(obj);
    }, 
    btnLoadFileF31_click: function(cmp, value) {
        
        Ext.MessageBox.show({
            title: 'Icon Support',
            msg:  'Sure to load this file?',
            buttons: Ext.MessageBox.OKCANCEL,
            icon: Ext.MessageBox.WARNING,
            fn: function(btn){
                if(btn === 'ok'){
//                    this.file = cmp.fileInputEl.dom.files[0];
                    me.onFileSelected();
                } else {
                    return;
                }
            }
        });
    },
    onFileSelected: function() {
        
        var form = Ext.getCmp(prototype.id + '-form-01').getForm();
        form.submit({
            url: prototype.url + '/uploadTaxF31fromExcel',
            waitMsg: 'Uploading your sure to upload the file...',
//            params: {beanString:JSON.stringify(me.BeanInitial)},
            /*success: function(response, options) {
                Ext.getCmp(prototype.id + '-gridDataColumns').unmask('Loading...');

                var res = Ext.JSON.decode(response.responseText);*/

            success: function (fp, o) {
                var res = Ext.decode(o.response.responseText);
                Ext.Msg.alert(res.mensaje);
            }
        }); 
    },
    btnLoad_click: function(cmp, value) {
        
        Ext.MessageBox.show({
            title: 'Icon Support',
            msg:  'Are you sure load  file to Force Match?',
            buttons: Ext.MessageBox.OKCANCEL,
            icon: Ext.MessageBox.WARNING,
            fn: function(btn){
                if(btn === 'ok'){
                    me.onFileSelected2();
                } else {
                    return;
                }
            }
        });
    },
    onFileSelected2: function() {
        
        var form = Ext.getCmp(prototype.id + '-form-02').getForm();
        form.submit({
            url: prototype.url + '/uploadfromExcel',
            waitMsg: 'Uploading your sure to upload the file...',
//            params: {beanString:JSON.stringify(me.BeanInitial)},
            /*success: function(response, options) {
                Ext.getCmp(prototype.id + '-gridDataColumns').unmask('Loading...');

                var res = Ext.JSON.decode(response.responseText);*/

            success: function (fp, o) {
                var res = Ext.decode(o.response.responseText);
                Ext.Msg.alert(res.mensaje);
            }
        }); 
    },
    onChangeCmbTabla: function(args, obj ,newValue , oldValue , event ) {
        console.log('1-' +obj + ' =====' + args + '······newValue=' + newValue + '?????oldValue=' + oldValue + 'FIN' + event + '<----');
        //console.log(value);
        if (newValue !== '' && newValue !== '#') {
            this.changeFile(args, 0);
        }
    },
    changeFile: function(tipo, dato) {
        var tabla = Ext.getCmp(prototype.id + '-cmbFunction').getValue();
        var tabla2 = Ext.getCmp(prototype.id + '-cmbTabla2').getValue();
        
        win.lblUser_toolTip("Estructura: " + tabla);
        if (tabla !== '') {
            if (tipo === 'Secundario') {
                this.obtainData('A1672', tabla2, dato);
            }
            else {
                this.obtainData('A1672', '', dato);
            }
        }
    },
    obtainData: function(tabla, tabla2, dato) {
        Ext.Ajax.request({
            url: prototype.url + '/obtainData',
            params: {
                tabla1: tabla,
                tabla2: tabla2
            },
            method: 'POST',
            beforerequest: Ext.getCmp(prototype.id + '-contentInfo').mask('Loading...'),
            success: function(response, options) {
                Ext.getCmp(prototype.id + '-contentInfo').unmask('Loading...');

                var res = Ext.JSON.decode(response.responseText);
                var resCampos = res.lstCampos;
                
                storeList.removeAll();

//                $('#' + bussinessTools.id + '-slideMain-outerCt').css('width', (500));
//                Ext.getCmp('gridDynamic-pagging').setStore({});
//                Ext.getCmp('gridDynamic-pagging-total').setHtml('of <b>0</b> results.');
//                Ext.getCmp(bussinessTools.id + '-panelCanvas').removeAll();
//                Ext.getCmp(bussinessTools.id + '-dataView').getStore().removeAll();
//                bussinessTools.store.removeAll();
//
                var lista = [];
//                var listaCampos = [];
                me.listaCampos = [];
                var listaCamposGrid = [];
                me.listaCampos.push({code: "", name: "All", tabla: "", size: "", tipo: "", fieldSys: "", userfield: "",label:""});

                for (var i = 0; i < resCampos.length; i++) {
                    var datos = {};
                    var datosCampos = {};
                    var datosCamposGrid = {};
                    if (resCampos[i].DATATYPE === 'D') {
                        datos = {
                            code: resCampos[i].ALIAS + '.' + resCampos[i].SYSTFIELD,
                            name: resCampos[i].DESCRIPT,
                            size: resCampos[i].LENGHTF
                        };
                        lista.push(datos);
                    }
                    datosCampos = {
                        code: resCampos[i].TABNAME + '.' + resCampos[i].SYSTFIELD,
                        name: resCampos[i].DESCRIPT,
                        tabla: resCampos[i].TABNAME,
                        size: resCampos[i].LENGHTF,
                        tipo: resCampos[i].DATATYPE,
                        fieldSys: resCampos[i].SYSTFIELD,
                        userfield: resCampos[i].USERFIELD, 
                        label: resCampos[i].USERFIELD + ' - ' + resCampos[i].DESCRIPT
                    };
                    me.listaCampos.push(datosCampos);

                    datosCamposGrid = {
                        select: false,
                        DESCRIPT: resCampos[i].DESCRIPT,
                        OrderBy: '',
                        COLOR: resCampos[i].COLOR === '' ? '#244066' : resCampos[i].COLOR.replace('0x', '#'),
                        DownUp: 'ASC',
                        ordenCol: '100',
                        campo: resCampos[i].SYSTFIELD,
                        tabla: resCampos[i].TABNAME,
                        FLAG: resCampos[i].FLAG,
                        ALIAS: resCampos[i].ALIAS,
                        size: resCampos[i].LENGHTF,
                        DATATYPE: resCampos[i].DATATYPE,
                        DCOLHDG: resCampos[i].DCOLHDG,
                        FIELDTYPE: resCampos[i].FIELDTYPE,
                        DECIMALF: resCampos[i].DECIMALF,
                        RN: i + 1
                    };
                    listaCamposGrid.push(datosCamposGrid);
                }
                var storeData = Ext.create('Ext.data.Store', {
                    data: lista,
                    autoLoad: true
                });
                var storeDataCombo = Ext.create('Ext.data.Store', {
                    data: me.listaCampos,
                    autoLoad: true
                });
                Ext.getCmp(prototype.id + '-cmbTipoFecha').bindStore(storeData);//
                
                
                for (var i = 1; i < 8; i++) {
                    Ext.getCmp(prototype.id + '-cmbCampo'+i).bindStore(storeDataCombo);
                    Ext.getCmp(prototype.id + '-cmbCampo'+i).setValue('');
                }


                Ext.getCmp(prototype.id + '-cmbTipoFecha').setValue(lista.length > 0 ? lista[0].code : '');
                

                var storeData = Ext.create('Ext.data.Store', {
                    data: listaCamposGrid,
                    autoLoad: true
                });
                Ext.getCmp(prototype.id + '-gridDataColumns').bindStore(storeData);
            }});
        
        console.log(me.listaCampos);
    },
    startDisplay: function() {
        var storeComboDataYear = win.getStoreYear(false);
        var storeComboDataMonth = win.getStoreMonth(true);
        var storeComboDataDay = win.getStoreDays(true);

        Ext.getCmp(prototype.id + '-cmbDateYear').bindStore(storeComboDataYear);
        Ext.getCmp(prototype.id + '-cmbDateMonth').bindStore(storeComboDataMonth);
        Ext.getCmp(prototype.id + '-cmbDateFromDay').bindStore(storeComboDataDay);
        Ext.getCmp(prototype.id + '-cmbDateToDay').bindStore(storeComboDataDay);
        Ext.getCmp(prototype.id + '-cmbDateYear').setValue(this.fecha.getFullYear());
        
        var month=this.fecha.getMonth()+1;
        if(month <10){
            month = '0' + month;
        }
        
        Ext.getCmp(prototype.id + '-cmbDateMonth').setValue(month);
        Ext.getCmp(prototype.id + '-cmbDateFromDay').setValue('');
        Ext.getCmp(prototype.id + '-cmbDateToDay').setValue('');
        
        var cmbFunction = Ext.getCmp(prototype.id + '-cmbFunction');
        cmbFunction.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ['', 'Select'],
//                ["FBASIS", "Update Fare Basis"],
//                ["FARE", "Match Fare"],
//                ["TAX", "Match Tax"],
//                ["ADM", "Generation of ADM"],
//                ["QATPCO", "Match Q"],
                ["UK", "Generation UK"],
                ["FORCE", "Match Force"],
                ["XO", "Tax XO"],
                ["F31", "Tax F31"]
            ]}));
//        cmbFunction.setValue('');

        var cmbFav = Ext.getCmp(prototype.id + '-cmbFav');
        cmbFav.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ['', 'Select']

            ]}));
        cmbFav.setValue('');
        
        
        for (var i = 2; i < 8; i++) {
            var cmbConector = Ext.getCmp(prototype.id + '-cmbConector' + i);
            cmbConector.bindStore(Ext.create('Ext.data.ArrayStore', {
                autoLoad: false,
                fields: ['code', 'name'],
                data: [
                    ["AND", "AND"],
                    ["OR", "OR"]
                ]}));
            cmbConector.setValue('AND');
        }
        
        var cmbUK = Ext.getCmp(prototype.id + '-cmbUK');
        cmbUK.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["", "Select"],
                ["1", "GDS"],
                ["2", "ADM"]
            ]
        }));
        cmbUK.setValue("");
        
        Ext.Ajax.request({
            url: prototype.url + '/obtainFiles',
            method: 'POST',
            timeout: 60000000,
            beforerequest: Ext.getBody().mask('Loading...'),
            params: {
                tabla: 'A1672'
            },
            success: function(response, options) {
                Ext.getBody().unmask('Loading...');
                var res = Ext.JSON.decode(response.responseText);
                var lstOperadores = res.lstOperadores;
                var lstFiles = res.lstFiles;
                var Usuario = res.Usuario;
                var newData = [];
                newData.push({TABNAME: '', DESCRIPT: 'Select',  SOURCEF: '',cli: '',USERFIELD: '',SYSTFIELD: '',strModul: ''});
                var dataOP = [];
                dataOP.push({data: "", label: "All", help: ""});
                var mod = '';
                for (var i = 0; i < lstFiles.length; i++) {
//                    if (i === 0 || mod !== lstFiles[i].strModul) {
//                        mod = lstFiles[i].strModul;
//                        var item = { TABNAME: '#', DESCRIPT: lstFiles[i].strModul,  SOURCEF: '',cli: '',USERFIELD: '',SYSTFIELD: '',strModul: ''};
//                        newData.push(item);
//                    }
                    var item = {
                        TABNAME: lstFiles[i].TABNAME,
                        SOURCEF: lstFiles[i].SOURCEF,
                        DESCRIPT: lstFiles[i].DESCRIPT,
                        USERFIELD: lstFiles[i].USERFIELD,
                        cli: lstFiles[i].TABNAME + '.' + lstFiles[i].USERFIELD,
                        SYSTFIELD: lstFiles[i].SYSTFIELD,
                        strModul: lstFiles[i].strModul

                    };
                    newData.push(item);
                }
                for (var j = 0; j < lstOperadores.length; j++) {
                    var itemOP = {
                        data: lstOperadores[j].OPERADOR,
                        label: lstOperadores[j].OPERADOR,
                        help: lstOperadores[j].DESCRIPT
                    };
                    dataOP.push(itemOP);
                }
                
                var storeData = Ext.create('Ext.data.Store', {
                    data: newData,
                    autoLoad: true
                });
                Ext.getCmp(prototype.id + '-cmbTabla2').bindStore(storeData);
                Ext.getCmp(prototype.id + '-cmbTabla2').setValue('');
                
                var storeDataOP = Ext.create('Ext.data.Store', {
                    data: dataOP,
                    autoLoad: true
                });
                
                
                for (var z = 1; z < 8; z++) {
                    Ext.getCmp(prototype.id + '-cmbOperador'+z).bindStore(storeDataOP);
                    Ext.getCmp(prototype.id + '-cmbOperador'+z).setValue('');
                }
                
//                setTimeout(function() {
//                    me.obtainData('A1672', '', '');
//                }, 200);
            }
        });
        
        cmbFunction.setValue('');
//        setTimeout(function() {
//                me.obtainDataFavoritos("A1672", 'DEFAULT','DEFAULT');
//        }, 1500);
    },
    btnSearch_click: function(obj, e) {
        me.gridActual = '-gridData';
        this.showGridActual();
        this.setFormatParameter();
        this.setGridData(obj, e);
    },
    setFormatParameter: function() {

        var IN_FECHA_FROM = Ext.getCmp(prototype.id + '-cmbDateYear').getValue() + Ext.getCmp(prototype.id + '-cmbDateMonth').getValue() + Ext.getCmp(prototype.id + '-cmbDateFromDay').getValue();
        var IN_FECHA_TO = Ext.getCmp(prototype.id + '-cmbDateYear').getValue() + Ext.getCmp(prototype.id + '-cmbDateMonth').getValue() + Ext.getCmp(prototype.id + '-cmbDateToDay').getValue();
        var strSQL = this.armandoQuery();  
        var strFecha = Ext.getCmp(prototype.id + '-cmbTipoFecha').getValue();
        var IN_TABLA = 'A1672';
        var IN_TABLA2 = Ext.getCmp(prototype.id + '-cmbTabla2').getValue();
        var strCliente ='A1672.A1672CCUST';
        var IN_SOURCEF = 'PXSAUDIT';
        var IN_SOURCEF2 = this.obtenerDatoCombo('-cmbTabla2', 'TABNAME', 'SOURCEF');
        var strOrderBy = this.createOrderBy();
        var strOrderByEtiquetas = me.orderbyEtiquetas;
//        var check = Ext.getCmp(prototype.id + '-chkSelGB').checked;

        me.searchParams = {
            IN_FECHA_FROM: IN_FECHA_FROM,
            IN_FECHA_TO: IN_FECHA_TO,
            strSQL : strSQL,
            IN_SOURCEF: IN_SOURCEF,
            IN_SOURCEF2: IN_SOURCEF2,
            IN_TABLA: IN_TABLA,
            IN_TABLA2: IN_TABLA2,
            strCliente: strCliente,
            strFecha: strFecha,
            strOrderBy: strOrderBy,
            strOrderByEtiquetas: strOrderByEtiquetas,
            strEtiquetas: '',
            strSelect: '',
            strSelectA: '',
            strSelectN: '',
            RN: ''
        };


//        if (check) {
//            this.createQuerySelectGroupBy();
//        } else {
            this.createQuerySelect();
//        }
        console.log(me.searchParams);
    },
    getSystFieldByUserField: function(campo) {
        
	var objCampo;
	var campoA1248 = '';
//        var lstCampos = Ext.getCmp(prototype.id + '-cmbCampo1').getStore().data.items;

        for (var j = 0; j < me.listaCampos.length; j++) {
            objCampo = me.listaCampos[j];
            if (objCampo["userfield"] === campo.trim()) {
                campoA1248 = objCampo["fieldSys"];
                break;
            }
        }
        return campoA1248;
    },
    getUserFieldBySystField: function(campo) {
        
	var objCampo;
	var campoA1248 = '';
//        var lstCampos = Ext.getCmp(prototype.id + '-cmbCampo1').getStore().data.items;

//        for (var j = 0; j < lstCampos.length; j++) {
//            objCampo = lstCampos[j];
//            if (objCampo.data["fieldSys"] === campo.trim()) {
//                campoA1248 = objCampo.data["userfield"];
//                break;
//            }
//        }

        for (var j = 0; j < me.listaCampos.length; j++) {
            objCampo = me.listaCampos[j];
            if (objCampo["fieldSys"] === campo.trim()) {
                campoA1248 = objCampo["userfield"];
                break;
            }
        }
        return campoA1248;
    },
    armandoQuery: function() {
        //Userfield = systfield
	//Armando Query ===========================================
	var strSQL = '';
	var temp = '';
	var temp2 = '';
	var campo = '';
	var esPrim = false;
	var dataType = '';
        
        
	//=========================================================
	//Campo 1 =================================================
        
        
        for (var i = 1; i < 8; i++) {
            
            var idtxtCampo = '-txtCampo'+i;
            var idcmbCampo = '-cmbCampo'+i;
            var idcmbCampoB = '-cmbCampo'+i+'B';
            var idtxtValue = '-txtValue'+i;
            var idtxtValueB = '-txtValue'+i+'B';
            var idcmbOperador = '-cmbOperador'+i;
            var idcmbConector = '-cmbConector'+i;
        
            var txtCampo = Ext.getCmp(prototype.id + idtxtCampo);
            var cmbCampo = Ext.getCmp(prototype.id + idcmbCampo).getValue();
            var cmbCampoB = Ext.getCmp(prototype.id + idcmbCampoB).getValue();
            var txtValue = Ext.getCmp(prototype.id + idtxtValue);
            var txtValueB = Ext.getCmp(prototype.id + idtxtValueB).getValue();
            var cmbConector = '';
            if(esPrim){
                cmbConector = Ext.getCmp(prototype.id + idcmbConector).getValue();
            }
            

            //alert(cmbCampo);
            var cmbOperador = Ext.getCmp(prototype.id + idcmbOperador).getValue();

            if(txtCampo.isVisible()){
                    campo = this.getSystFieldByUserField(txtCampo.getValue().toUpperCase());
            }else{
                    campo = this.getSystFieldByUserField(cmbCampo.toUpperCase());
            }

            if(campo !== '' && (txtValue.getValue() !== '' || cmbCampoB!== '') ){

                    if(txtValue.isVisible()){
                            dataType = '';
                            temp = txtValue.getValue().toUpperCase();
                            temp2= txtValueB.toUpperCase();
                    }else{
                            temp = cmbCampoB.toUpperCase();
                            dataType = 'N';
                    }
                    
                    
                    
                    if(esPrim){
                            strSQL += cmbConector.toUpperCase();
                    }
                    
                    
                    strSQL += " " + campo + " " + this.getConectorSql(cmbOperador, '', temp, temp2,dataType);
                    esPrim = true;
            }
            //=================================================
            //Campo 2 =============================================
        }
        
        
        
        //alert(strSQL);
        
        
        return strSQL; 
    },

    getConectorSql: function(operador, combo,campo1,campo2, dataType){
            var operadorEq = '';
            var param = campo1.split(',');
            var open=" '",close="' ";
            if(dataType == "N"){
                    //Si es numerico no se pone ''
                    open=" ",close=" ";
                    //campo= "DECIMAL("+campo+", 13, 2 )";
            }

            switch(operador.trim()){
                    case 'EQ':
                            operadorEq = '=' + open + campo1 + close;
                            break;
                    case 'GT':
                            operadorEq = '>' + open + campo1 + close;
                            break;
                    case 'LT':
                            operadorEq = '<' + open + campo1 + close;;
                            break;
                    case 'GE':
                            operadorEq = '>=' + open + campo1 + close;
                            break;
                    case 'LE':
                            operadorEq = '<=' + open + campo1 + close;
                            break;
                    case 'NE':
                            operadorEq = '<>' + open + campo1 + close;
                            break;
                    case 'LIKE':
                            operadorEq = ' LIKE ' + open + campo1 + close;
                            break;
                    case 'NLIKE':
                            operadorEq = 'NOT LIKE' + open + campo1 + close;
                            break;
                    case 'LIST': 
                            operadorEq = 'IN ('
                            for(var c = 0; c < param.length; c++){
                                    operadorEq += param[c] 
                                    if(c+2 <= param.length){
                                            operadorEq += ',';
                                    }
                            }
                            operadorEq += ') ';
                            break;
                    case 'NLIST': 
                            operadorEq = 'NOT IN ('
                            for(var j= 0; j < param.length; j++){
                                    operadorEq += param[j] 
                                    if(j+2 <= param.length){
                                            operadorEq += ',';
                                    }
                            }
                            operadorEq += ') ';
                            break;
                    case 'BETWEEN':
                            operadorEq = ' BETWEEN ' + open + campo1 + close+ ' AND ' + open + campo2 + close + ' ';
                            break;
                    default:
                            operadorEq = '=';
                            //setComboBoxItem(combo, 'All');
                            break;
            }

            return operadorEq;
    },
    createQuerySelectGroupBy: function() {
        var arr2 = Ext.getCmp(prototype.id + '-panelListColumns').getStore().data.items;
        var etiq = '';
        var select = '';
        var selectA = '';
        var selectN = '';
        var coldefault = 7 - (arr2.length % 7);
        var cn = 0;
        var existsNumeric = false;

        for (var j = 0; j < arr2.length; j++) {

            if (arr2[j].data["DATATYPE"] === 'N') {
                existsNumeric = true;
            }
            var strComa = '';
            if (j > 0) {
                strComa = ',';
            } else {
                strComa = '';
            }

            etiq += strComa + 'column' + (j + 1);
            if (arr2[j].data["DATATYPE"] === 'N') {
                selectA += strComa + 'SUM(' + arr2[j].data["campo"] + ') column' + (j + 1);
                selectN += strComa + 'SUM(' + arr2[j].data["campo"] + ') tot' + (j + 1);
            } else {
                select += strComa + arr2[j].data["campo"];
                selectA += strComa + arr2[j].data["campo"] + ' column' + (j + 1);
                selectN += strComa + '0 tot' + (j + 1);
            }

            if (j + 1 === arr2.length) {
                if (coldefault !== 7) {//Complemento las colunas en blanco por defecto
                    for (var u = 1; u <= coldefault; u++) {
                        etiq += ',column' + (arr2.length + u);
                        selectA += ',@ ' + ' column' + (arr2.length + u);
                        selectN += ',0 ' + ' tot' + (arr2.length + u);
                    }
                }
            }
        }

        if (!existsNumeric) {
            selectN = '';
        }


        me.searchParams.strEtiquetas = etiq;
        me.searchParams.strSelect = select;
        me.searchParams.strSelectA = selectA;
        me.searchParams.strSelectN = selectN;
        me.searchParams.RN = arr2.length;
    },
    createQuerySelect: function() {
        var arr2 = Ext.getCmp(prototype.id + '-panelListColumns').getStore().data.items;
        var selectA = '';
        var selectN = '';
        var coldefault = 7 - (arr2.length % 7);
        var existsNumeric = false;

        for (var j = 0; j < arr2.length; j++) {
            var strComa = '';
            if (j > 0) {
                strComa = ',';
            } else {
                strComa = '';
            }
            var ALIAS = arr2[j].data["ALIAS"] + '.';
            var CAMPO = arr2[j].data["campo"];

            if(arr2[j].data["FIELDTYPE"] === 'C'){
                    //sI ES CAMPO COMPUESTO NO SE LE AGREGA ETIQUETA (A1672.)
                    ALIAS='';
            }
        
            selectA += strComa + ALIAS + CAMPO + ' column' + (j + 1);
            if (arr2[j].data["DATATYPE"] === 'N') {
                existsNumeric = true;
                selectN += strComa + 'SUM(' + ALIAS + CAMPO + ') tot' + (j + 1);
            } else {
                selectN += strComa + '0 tot' + (j + 1);
            }

            if (j + 1 === arr2.length) {
                if (coldefault !== 7) {//Complemento las colunas en blanco por defecto
                    for (var u = 1; u <= coldefault; u++) {
                        selectA += ',@ ' + ' column' + (arr2.length + u);
                        selectN += ',0 ' + ' tot' + (arr2.length + u);
                    }
                }
            }
        }

        if (!existsNumeric) {
            selectN = '';
        }
        me.searchParams.strSelect = '';
        me.searchParams.strSelectA = selectA;
        me.searchParams.strSelectN = selectN;
        me.searchParams.RN = arr2.length;
    },
    createOrderBy: function() {
        var arr1 = Ext.getCmp(prototype.id + '-gridDataColumns').getStore().data.items;
        var arr2 = Ext.getCmp(prototype.id + '-panelListColumns').getStore().data.items;

        var orderby = '';
        var nomCol = '';
        var obj;
        var DownUp = 'ASC';
        var flag = false;
        var flagNum = false;
        var ArrOB = [];
        me.orderbyEtiquetas = '';

        for (var i = 0; i < arr2.length; i++) {
            var rowIndex = arr2[i].data["RN"] - 1;
            arr2[i].data["DownUp"] = arr1[rowIndex].data["DownUp"];
            arr2[i].data["OrderBy"] = arr1[rowIndex].data["OrderBy"];
        }



        for (var j = 0; j < arr2.length; j++) {
            nomCol = 'column' + (j + 1);
            if (arr2[j].data["OrderBy"] !== '') {
                flag = true;
                obj = arr2[j];
                obj.data["campo2"] = nomCol;
                ArrOB.push(obj);
                if (arr2[j].data["DATATYPE"] === 'N' || arr2[j].data["campo"].indexOf("SUBSTR") !== -1) {
                    flagNum = true;
                }
            }
        }

        if (flag) {
            ArrOB.sort(function(a, b) {
                return a.OrderBy - b.OrderBy;
            });

            orderby = ' order by ';
            me.orderbyEtiquetas = ' order by ';
            for (var h = 0; h < ArrOB.length; h++) {
                if (ArrOB[h].data["DownUp"] === 'DESC') {
                    DownUp = 'DESC';
                } else {
                    DownUp = 'ASC';
                }
                if (h + 1 === ArrOB.length) {
                    orderby += ArrOB[h].data["campo"] + ' ' + DownUp;
                    me.orderbyEtiquetas += ArrOB[h].data["campo2"] + ' ' + DownUp;
                } else {
                    orderby += ArrOB[h].data["campo"] + ' ' + DownUp + ',';
                    me.orderbyEtiquetas += ArrOB[h].data["campo2"] + ' ' + DownUp + ',';
                }
            }
        }

        if (!flagNum) {
            me.orderbyEtiquetas = '';
        }

        return orderby;
    },
    obtenerDatoCombo: function(combo, valida, campo) {
        var tabla = Ext.getCmp(prototype.id + combo).getValue();
        var array = Ext.getCmp(prototype.id + combo).getStore().data.items;
        var result = '';
        
        for (var i = 0; i < array.length; i++) {
            if (array[i].data[valida] === tabla) {
                result = array[i].data[campo];
            }
        }


        return result;
    },
    /*setStoreDataGridDynamic: function() {

        this.storeGridDynamic = new Ext.data.ArrayStore({
            idProperty: 'storeGridDynamicId',
            autoDestroy: true,
            storeId: 'storeGridDynamicId',
            idIndex: 0,
            fields: [
                {dataIndex: 'column1', text: 'FUENT', width: 80, align: 'center', type: 'string', level: 1}
            ]
        });

    },*/
    configurarGridData: function() {
        this.hideColumns();
        var arr2 = Ext.getCmp(prototype.id + '-panelListColumns').getStore().data.items;
        var numColumns = me.searchParams.RN;
//        var check = Ext.getCmp(prototype.id + '-chkSelGB').checked;
        var anchoGrilla = numColumns * 100 + 2;
        if (anchoGrilla > 500) {
            anchoGrilla = 502;
        }
        if (numColumns>0) {
            anchoGrilla = anchoGrilla + 100;
        }

        Ext.getCmp(prototype.id + '-panelLabelPagination').show();
        Ext.getCmp(prototype.id + '-gridData').setWidth(anchoGrilla);
        for (var i = 0; i < numColumns; i++) {
            Ext.getCmp(prototype.id + '-campo' + (i + 1)).show();
            Ext.getCmp(prototype.id + '-campo' + (i + 1)).setText(arr2[i].data["DCOLHDG"]);
        }
//        if (check && (numColumns>0)) {
        if (numColumns>0) {
            Ext.getCmp(prototype.id + '-QTY').show();
            Ext.getCmp(prototype.id + '-QTY').setText('Qty Record');
        } else {
            Ext.getCmp(prototype.id + '-QTY').hide();
        }
    },
    hideColumns: function() {
        for (var i = 1; i < 63; i++) {
            Ext.getCmp(prototype.id + '-campo' + (i + 1)).hide();
        }
    },
    setGridData: function(obj, val) {
        console.log('busqueda');
        console.log(me.searchParams);
        this.configurarGridData();
        var storeGridDatas = Ext.create('Ext.Praxis.store.salesAudit.GridData', {
            proxy: {
                url: prototype.url + '/searchFields'
            }, listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = {beanString : JSON.stringify(me.searchParams)};
                },
                load: function(obj) {
                    me.printPagination('');

                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found.'
                        });
                    } else {

//                        var element = obj.data.items[0].data;
//                        Ext.getCmp(prototype.id + '-columnMonth1').setText(element.labelMes1);
//                        Ext.getCmp(prototype.id + '-columnMonth2').setText(element.labelMes2);
//                        Ext.getCmp(prototype.id + '-columnMonth3').setText(element.labelMes3);
//                        Ext.getCmp(prototype.id + '-columnMonth4').setText(element.labelMes4);
//                        Ext.getCmp(prototype.id + '-columnMonth5').setText(element.labelMes5);
//                        Ext.getCmp(prototype.id + '-columnMonth6').setText(element.labelMes6);

                    }
                }
            }
        });
        global.clear();
        lg('---');
        lg(storeGridDatas);    
        
        Ext.getCmp(prototype.id + '-gridData').bindStore(storeGridDatas);
        
        var objitems = Ext.getCmp(prototype.id + '-gridData').getStore().data.items;
        lg('-ttt');
        lg(objitems);    
        var objColumns = Ext.getCmp(prototype.id + '-gridData').config.columns.items;
        lg('-columns');
        lg(objColumns); 
        
        Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas);
//        Ext.getCmp(prototype.id + '-grafico01').bindStore(storeGridDatas);
    },
    printPagination: function(clean) {
        
        var pag = Ext.getCmp(prototype.id + '-paggin');
        var pagData = pag.getPageData();
        var  currentPage = 0;
        var  pageCount = 0;
        var  total = 0;
        if(clean === ''){
             currentPage = Ext.util.Format.number(pagData.currentPage, '0,000');
             pageCount = Ext.util.Format.number(pagData.pageCount, '0,000');
             total = Ext.util.Format.number(pagData.total, '0,000');
        }
        
        Ext.getCmp(prototype.id + '-lbl-currentPage').setText(currentPage);
        Ext.getCmp(prototype.id + '-lbl-pageCount').setText(pageCount);
        Ext.getCmp(prototype.id + '-lbl-total').setText(total);
    },
    changecmbCampo: function(nbr) {
        var idtxt ='-txtCampo' + nbr;
        var idcmb ='-cmbCampo' + nbr;
        Ext.getCmp(prototype.id + idtxt).setValue(Ext.getCmp(prototype.id + idcmb).getValue());
        
    },
    changeOperador: function(nbr) {
        var v_cmb = Ext.getCmp(prototype.id + '-cmbOperador' + nbr);
        var v_hbox = Ext.getCmp(prototype.id + '-hb_Between' + nbr);
        var v_text = Ext.getCmp(prototype.id + '-txtValue' + nbr + 'B');
        
        v_text.setValue('');
	if(v_cmb.getValue()==='BETWEEN'){
	   v_hbox.show();
	}else{
	   v_hbox.hide();
	}
    },
    imgClearRow: function(nbr) {
	/*if(nro!='1'){
		var v_cmbConector:ComboBox = this["cmbConector"+nro];
	}*/
	var v_txtCampoText = Ext.getCmp(prototype.id + '-txtCampo' + nbr);
	var v_cmbCampo = Ext.getCmp(prototype.id + '-cmbCampo' + nbr);
	//var v_cmbCampoB = Ext.getCmp(prototype.id + '-cmbCampo' + nbr + 'B');
	var v_cmbOperador = Ext.getCmp(prototype.id + '-cmbOperador' + nbr);
	var v_txtValue = Ext.getCmp(prototype.id + '-txtValue' + nbr);
	var v_txtValueBetween = Ext.getCmp(prototype.id + '-txtValue' + nbr + 'B');
	var v_hbox = Ext.getCmp(prototype.id + '-hb_Between' + nbr);
        
	if(nbr!='1'){
            //SelectedIndex = 0
            var cb = Ext.getCmp(prototype.id + '-cmbConector'+nbr);     
            cb.setValue(cb.getStore().getAt(0).get(cb.valueField));   
	}
	
	v_txtCampoText.setValue('');
	v_cmbCampo.setValue('');
	//v_cmbCampoB.selectedIndex=0;
	v_cmbOperador.setValue('');
	v_txtValue.setValue('');
	v_txtValueBetween.setValue('');
        v_hbox.hide();
    },
    imgInfo_clickHandler: function(nbr) {
        
        var idtxt ='-txtCampo' + nbr;
        var idcmb ='-cmbCampo' + nbr;
        
        if(Ext.getCmp(prototype.id + idtxt).isVisible()){
            Ext.getCmp(prototype.id + idtxt).hide();
            Ext.getCmp(prototype.id + idcmb).show();
        }else{
            Ext.getCmp(prototype.id + idtxt).show();
            Ext.getCmp(prototype.id + idcmb).hide();
        }
        
    },
    onSelectCmbFav: function(obj, value) {
        
//        var twait = 500;
//        if (obj.value !== '') {
//            var tabla = Ext.getCmp(prototype.id + 'cmbFunction').getValue();
//            var codigo = Ext.getCmp(prototype.id + '-cmbFav').getValue();
//
//            Ext.Ajax.request({
//                url: prototype.url + '/obtainDataFavoritos',
//                params: {tabla: tabla, codigo: codigo},
//                method: 'POST',
//                success: function(response, options) {
//                    storeList.removeAll();
//                    var res = Ext.JSON.decode(response.responseText);
//                    res = res.data;
//                    if (res[0].IN_TABLA2.trim() !== '') {
//                        Ext.getCmp(prototype.id + '-cmbTabla2').setValue(res[0].IN_TABLA2.trim());
////                        prototype.ChangeFile('Secundario', 1);
//                        me.changeFile('Secundario', 1);
//                        twait = 2000;
//                    }
//
//                    
//                    setTimeout(function() {
//                        //Armo data que regreso de Favoritos
//                        var arr1 = Ext.getCmp(prototype.id + '-gridDataColumns').getStore();
//                        var list = [];
//                        for (var j = 0; j < arr1.data.items.length; j++) {
//                            var data = arr1.data.items[j].data;
//                            data.select = false;
//                            data.check = true;
//                            data.OrderBy = '';
//                            data.DownUp = 'ASC';
//
//                        }
//                        for (var i = 0; i < res.length; i++) {
//                            var obj = res[i];
//                            for (var j = 0; j < arr1.data.items.length; j++) {
//                                var data = arr1.data.items[j].data;
//                                if (data.campo === obj.strCampo) {
//                                    data.select = true;
//                                    data.check = true;
//                                    data.OrderBy = obj.strOrderBy;
//                                    data.DownUp = obj.strAscDesc === 1 ? 'DESC' : 'ASC';
//                                    data.ordenCol = obj.orden;
//                                    storeList.add(data);
//                                    break;
//                                }
//                            }
//                        }
//                        for (var j = 0; j < arr1.data.items.length; j++) {
//                            list.push(arr1.data.items[j].data);
//                        }
//
//                        var storeData = Ext.create('Ext.data.Store', {
//                            data: list,
//                            autoLoad: true
//                        });
//                        Ext.getCmp(prototype.id + '-gridDataColumns').bindStore(storeData);
////                        Ext.getCmp(prototype.id + '-chkSelGB').setValue(res[0].chkGroup);
//                        me.displayQuery(res[0].strSQL);
//                        Ext.getCmp(prototype.id + '-cmbTipoFecha').setValue(res[0].strFecha.trim());
//    //                    me.btnSearch_click();
//
//                    }, twait);
//                }
//            });
//        }
    },
    displayQuery: function(Query) {
        
        var param = Query.split(';');
        var cb2 = Ext.getCmp(prototype.id + '-cmbConector2');
        var cb3 = Ext.getCmp(prototype.id + '-cmbConector3');
        var cb4 = Ext.getCmp(prototype.id + '-cmbConector4');
        var cb5 = Ext.getCmp(prototype.id + '-cmbConector5');
        var cb6 = Ext.getCmp(prototype.id + '-cmbConector6');
        var cb7 = Ext.getCmp(prototype.id + '-cmbConector7');
        
        Ext.getCmp(prototype.id + '-txtCampo1').setValue(this.getUserFieldBySystField(param[0]));
        Ext.getCmp(prototype.id + '-cmbCampo1').setValue(this.getUserFieldBySystField(param[0]));
        Ext.getCmp(prototype.id + '-cmbOperador1').setValue(param[1]);
        Ext.getCmp(prototype.id + '-txtValue1').setValue(param[2]);
        
        
        cb2.setValue(cb2.getStore().getAt(param[3]).get(cb2.valueField)); 
        Ext.getCmp(prototype.id + '-txtCampo2').setValue(this.getUserFieldBySystField(param[4]));
        Ext.getCmp(prototype.id + '-cmbCampo2').setValue(this.getUserFieldBySystField(param[4]));
        Ext.getCmp(prototype.id + '-cmbOperador2').setValue(param[5]);
        Ext.getCmp(prototype.id + '-txtValue2').setValue(param[6]);
        
        cb3.setValue(cb3.getStore().getAt(param[7]).get(cb3.valueField)); 
        Ext.getCmp(prototype.id + '-txtCampo3').setValue(this.getUserFieldBySystField(param[8]));
        Ext.getCmp(prototype.id + '-cmbCampo3').setValue(this.getUserFieldBySystField(param[8]));
        Ext.getCmp(prototype.id + '-cmbOperador3').setValue(param[9]);
        Ext.getCmp(prototype.id + '-txtValue3').setValue(param[10]);
        
        cb4.setValue(cb4.getStore().getAt(param[11]).get(cb4.valueField)); 
        Ext.getCmp(prototype.id + '-txtCampo4').setValue(this.getUserFieldBySystField(param[12]));
        Ext.getCmp(prototype.id + '-cmbCampo4').setValue(this.getUserFieldBySystField(param[12]));
        Ext.getCmp(prototype.id + '-cmbOperador4').setValue(param[13]);
        Ext.getCmp(prototype.id + '-txtValue4').setValue(param[14]);
        
        cb5.setValue(cb5.getStore().getAt(param[15]).get(cb5.valueField)); 
        Ext.getCmp(prototype.id + '-txtCampo5').setValue(this.getUserFieldBySystField(param[16]));
        Ext.getCmp(prototype.id + '-cmbCampo5').setValue(this.getUserFieldBySystField(param[16]));
        Ext.getCmp(prototype.id + '-cmbOperador5').setValue(param[17]);
        Ext.getCmp(prototype.id + '-txtValue5').setValue(param[18]);
        
        cb6.setValue(cb6.getStore().getAt(param[19]).get(cb6.valueField)); 
        Ext.getCmp(prototype.id + '-txtCampo6').setValue(this.getUserFieldBySystField(param[20]));
        Ext.getCmp(prototype.id + '-cmbCampo6').setValue(this.getUserFieldBySystField(param[20]));
        Ext.getCmp(prototype.id + '-cmbOperador6').setValue(param[21]);
        Ext.getCmp(prototype.id + '-txtValue6').setValue(param[22]);
        
        cb7.setValue(cb7.getStore().getAt(param[23]).get(cb7.valueField)); 
        Ext.getCmp(prototype.id + '-txtCampo7').setValue(this.getUserFieldBySystField(param[24]));
        Ext.getCmp(prototype.id + '-cmbCampo7').setValue(this.getUserFieldBySystField(param[24]));
        Ext.getCmp(prototype.id + '-cmbOperador7').setValue(param[25]);
        Ext.getCmp(prototype.id + '-txtValue7').setValue(param[26]);
        
        Ext.getCmp(prototype.id + '-contentInfo').unmask('Loading...');
    },
    btnBack_click: function(obj, e) {


        if (me.drillDown.length > 0) {
            if (me.gridActual !== '-gridData') {
                me.gridActual = me.drillDown.pop();
                this.showGridActual();
                this.getPaggin();
                if (me.pagginActual !== '') {
                    var pag = Ext.getCmp(prototype.id + me.pagginActual);
                    var pagData = pag.getPageData();
                    Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
                    Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
                    Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));
                }
            } else {
                me.drillDown = [];
                global.showMenu();
            }

        } else {
            global.showMenu();
        }
    },
//    btnDisplay_click: function() {
//        var option = Ext.getCmp(prototype.id + '-panelGraficos');
//        if (option.isVisible()) {
//            option.setVisible(false);
//        } else {
//            option.setVisible(true);
//        }
//    },
    btnClear_click: function(obj, e) {
        var yearFrom = Ext.getCmp(prototype.id + '-cmbDateFromYear');
        var monthFrom = Ext.getCmp(prototype.id + '-cmbDateFromMonth');
        yearFrom.setValue(this.fecha.getFullYear());
        monthFrom.setValue('');
    },
    btnExcel_click: function(obj, e) {
        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: 'Download Excel ?',
            buttons: Ext.MessageBox.OKCANCEL,
            scope: this,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function(btn) {
                if (btn === 'ok') {
                    this.exportExcel();
                }
            }
        });
    },
    exportExcel: function() {
        
        switch (me.gridActual) {
            case  '-gridData':
//                        var grid = Ext.getCmp(prototype.id + '-gridData');
//                        
//                        this.setFormatParameter();
//                        var data = me.searchParams;
//
//                        //var schema = JSON.stringify({text: "", columns: grid.config.columns.items});
//                        var schema = JSON.stringify({text: "", columns: this.getColumns()});
//                        data.schema = schema;
//
//                        var url = prototype.url;
//                        var params = Object.keys(data).map(function(k) {
//                            return encodeURIComponent(k) + '=' + encodeURIComponent(data[k]);
//                        }).join('&');
//
//                        //var method = grid.exportXLSMethod;
//                        var method = '/getFieldsXLSX';
//                        url += method + '?' + params;
//                        lg(url);
//                        global.getFile(url);
                        
                        
                        var grid = Ext.getCmp(prototype.id + '-gridData');
                        
                        this.setFormatParameter();
                        var data = me.searchParams;

                        //var schema = JSON.stringify({text: "", columns: grid.config.columns.items});
                        var schema = JSON.stringify({text: "", columns: this.getColumns()});
                        data.schema = schema;

                        me.me.searchParams = data;
                        var url = prototype.url;
//                        console.log(data);
//                        var params = Object.keys(data).map(function(k) {
//                            return encodeURIComponent(k) + '=' + encodeURIComponent(data[k]);
//                        }).join('&');
//
//                        var method = '/getFieldsXLSX';
//                        url += method + '?' + params;
//                        global.getFile(url);


                        console.log(prototype.url + '/getFieldsXLSX');
                        console.log(JSON.stringify(me.searchParams));
                        console.log(schema);

                        var mapForm = document.createElement("form");
                        mapForm.target = "_blank";
                        mapForm.method = "POST"; // or "post" if appropriate
                        mapForm.action = prototype.url + '/getFieldsXLSX';

                        var mapInput = document.createElement("input");
                        mapInput.type = "text";
                        mapInput.name = "beanString";
                        mapInput.value = JSON.stringify(me.searchParams);
                        mapForm.appendChild(mapInput);

                        var mapInput = document.createElement("input");
                        mapInput.type = "text";
                        mapInput.name = "schema";
                        mapInput.value = schema;
                        mapForm.appendChild(mapInput);

                        document.body.appendChild(mapForm);


                        mapForm.submit();
                
                break;

            default:
                global.Msg({
                    msg: 'Under Construction'
                });
                break;
        }
    },
    btnTXT_click: function(obj, e) {
        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: 'Download Excel ?',
            buttons: Ext.MessageBox.OKCANCEL,
            scope: this,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function(btn) {
                if (btn === 'ok') {
                    this.exportTXT();
                }
            }
        });
    },
    exportTXT: function() {

        switch (me.gridActual) {
            case  '-gridData':
//                        var grid = Ext.getCmp(prototype.id + '-gridData');
//                        
//                        this.setFormatParameter();
//                        var data = me.searchParams;
//
//                        //var schema = JSON.stringify({text: "", columns: grid.config.columns.items});
//                        var schema = JSON.stringify({text: "", columns: this.getColumns()});
//                        data.schema = schema;
//                        
//                        
//                        var arr2 = Ext.getCmp(prototype.id + '-panelListColumns').getStore().data.items;
//                        for (var j = 0; j < arr2.length; j++) {
//                                //Alert.show(Lista2.g);
//                                if(j === 0){
//                                        data.column1 = arr2[j].data["DCOLHDG"].trim(); 
//                                }else{
//                                        data.column1 += ',' +  arr2[j].data["DCOLHDG"].trim(); 
//                                }
//                        }
//
//                        var url = prototype.url;
//                        var params = Object.keys(data).map(function(k) {
//                            return encodeURIComponent(k) + '=' + encodeURIComponent(data[k]);
//                        }).join('&');
//
//                        //var method = grid.exportXLSMethod;
//                        var method = '/ExportTXT';
//                        url += method + '?' + params;
//                        lg(url);
//                        global.getFile(url);
                        
                        
                        var grid = Ext.getCmp(prototype.id + '-gridData');
                        
                        this.setFormatParameter();
                        var data = me.searchParams;

                        //var schema = JSON.stringify({text: "", columns: grid.config.columns.items});
                        var schema = JSON.stringify({text: "", columns: this.getColumns()});
                        data.schema = schema;

                        var arr2 = Ext.getCmp(prototype.id + '-panelListColumns').getStore().data.items;
                        for (var j = 0; j < arr2.length; j++) {
                                //Alert.show(Lista2.g);
                                if(j === 0){
                                        data.column1 = arr2[j].data["DCOLHDG"].trim(); 
                                }else{
                                        data.column1 += ',' +  arr2[j].data["DCOLHDG"].trim(); 
                                }
                        }
                        
                        me.me.searchParams = data;
                        var url = prototype.url;
//                        console.log(data);
//                        var params = Object.keys(data).map(function(k) {
//                            return encodeURIComponent(k) + '=' + encodeURIComponent(data[k]);
//                        }).join('&');
//
//                        var method = '/ExportTXT';
//                        url += method + '?' + params;
//                        global.getFile(url);


                        var mapForm = document.createElement("form");
                        mapForm.target = "_blank";
                        mapForm.method = "POST"; // or "post" if appropriate
                        mapForm.action = prototype.url + '/ExportTXT';

                        var mapInput = document.createElement("input");
                        mapInput.type = "text";
                        mapInput.name = "beanString";
                        mapInput.value = JSON.stringify(me.searchParams);
                        mapForm.appendChild(mapInput);

                        var mapInput = document.createElement("input");
                        mapInput.type = "text";
                        mapInput.name = "schema";
                        mapInput.value = schema;
                        mapForm.appendChild(mapInput);

                        document.body.appendChild(mapForm);


                        mapForm.submit();
                        
                break;

            default:
                global.Msg({
                    msg: 'Under Construction'
                });
                break;
        }
    },
    getColumns: function(){
        var columns = [ ];

        var arr2 = Ext.getCmp(prototype.id + '-panelListColumns').getStore().data.items;
        var numColumns = me.searchParams.RN;
        var colsize = 80;
        
        for (var j = 0; j < numColumns; j++) {
            var data = {
                dataIndex: "column" + (j + 1).toString(),
                //name: "column" + (j + 1).toString(),
                text: arr2[j].data['DCOLHDG']
            };

            if (arr2[j].data['DATATYPE'] === "N") {
                colsize = 90;
                data.align = "right";
                data.type = "float";
                //data.summaryType = bussinessTools.summaryField('tot' + (j + 1));
            }else {
                data.align = "center";
                data.type = "string";
                if (arr2[j].data['size'] > 1) {
                    if (arr2[j].data['size'] > 15) {
                        colsize = arr2[j].data['size'] * 4;
                    } else if (arr2[j].data['size'] > 8) {
                        colsize = arr2[j].data['size'] * 10;
                    } else if (arr2[j].data['size'] > 5) {
                        colsize = arr2[j].data['size'] * 13;
                    } else {
                        colsize = arr2[j].data['size'] * 25;
                    }
                }
            }
            data.width = colsize;
            data.level = 1;
            //lg(data);
            
            columns.push(data);
            
            
        }

        return columns;
    },
    onChangeBox: function() {
        console.log("Cambio");
    },
    btnFilter_click: function(obj) {
        var option = Ext.getCmp(prototype.id + '-panelFilters2');
        if (option.isVisible()) {
            option.setVisible(false);
        } else {
            option.setVisible(true);
        }
    },
    /*     
     * Funciones para la paginacion     
     */
    getPaggin: function() {
        me.pagginActual = '';
        switch (me.gridActual) {
            case  '-gridData':
                me.pagginActual = '-paggin';
                break;
            case  '-gridDataPending':
                me.pagginActual = '-paggin2';
                break;

        }
    },
    pagFirst: function(obj, e) {
        this.getPaggin();
        var pag = Ext.getCmp(prototype.id + me.pagginActual);
        pag.moveFirst();
    }, pagPrevious: function(obj, e) {
        this.getPaggin();
        var pag = Ext.getCmp(prototype.id + me.pagginActual);
        pag.movePrevious();
    },
    pagNext: function(obj, e) {
        this.getPaggin();
        var pag = Ext.getCmp(prototype.id + me.pagginActual);
        pag.moveNext();
    },
    pagLast: function(obj, e) {
        this.getPaggin();
        var pag = Ext.getCmp(prototype.id + me.pagginActual);
        pag.moveLast();
    },
    Search_keyDownHandler: function(obj, e, eOpts) {
        console.log('Search_keyDownHandler');
        switch (e.getKey()) {
            case 13:
                this.btnSearch_click();
                break;
        }
    }
});
