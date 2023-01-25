/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.controller.gerencial.BusinessTools.BusinessToolsController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.BusinessToolsController',
    fecha: new Date(),
    drillDown: [],
    gridActual: '',
    orderbyEtiquetas: '',
    me: '',
    searchParams: {},
    paramsDetail: {},
    gridProviderDynamic: [],
    listaCampos : [],
    info_perm: [],
    resObtainDataFavoritos: [],
    init: function(view) {
        prototype.id = 'BusinessToolsForm';
        prototype.url = CONTEXTPATH + '/BusinessTools';
        me = this;
        this.control({
            // -------------------Eventos Genericos --------------------
            '#BusinessToolsForm-xpanel': {
                afterrender: this.xpanel_afterrender
            }
            ,
            '#BusinessToolsForm-btnSearch': {
                click: this.btnSearch_click
            },
            '#BusinessToolsForm-btnClear': {
                click: this.btnClear_click
            },
            '#BusinessToolsForm-btnExcel': {
                click: this.btnExcel_click
            },
            '#BusinessToolsForm-btnTxt': {
                click: this.btnTXT_click
            },
            '#BusinessToolsForm-btnFilter': {
                click: this.btnFilter_click
            },
            '#BusinessToolsForm-btnDisplay': {
                click: this.btnDisplay_click
            },
            '#BusinessToolsForm-btnBack': {
                click: this.btnBack_click
            },
            '#BusinessToolsForm-btn-pag-first': {
                click: this.pagFirst
            },
            '#BusinessToolsForm-btn-pag-previous': {
                click: this.pagPrevious
            },
            '#BusinessToolsForm-btn-pag-next': {
                click: this.pagNext
            },
            '#BusinessToolsForm-btn-pag-last': {
                click: this.pagLast
            },
            '#BusinessToolsForm-imgInfo': {
                click: this.onClickImgInfo
            },
            '#BusinessToolsForm-imgSave': {
                click: this.onClickImgSave
            },
            '#BusinessToolsForm-cmbFav': {
                select: this.onSelectCmbFav
            },
            '#BusinessToolsForm-imgBuild': {
                click: this.onClickImgBuild
            }





        });
    },
    xpanel_afterrender: function(obj, e) {

        console.log("Inicio Controller");
        this.setStoreData();
        //win.lblUser_toolTip("Estructura: CAF020");
        // this.btnSearch_click();
        this.validateProgram('PX00000282');
    },
    showGridActual: function() {
        this.hideAllGrid();
//        Ext.getCmp(prototype.id + this.gridActual).show();
    },
    hideAllGrid: function() {
//        Ext.getCmp(prototype.id + '-gridData').hide();
    },
    onClickImgBuild: function() {
        
        var vPag = Ext.getCmp(prototype.id + '-panelLabelPagination');
        var vPanel = Ext.getCmp(prototype.id + '-panelSelectField');
        
        var vgridData = Ext.getCmp(prototype.id + '-gridDanamic');
        var vpanelResult = Ext.getCmp(prototype.id + '-panelResult');
        var vpanelPag = Ext.getCmp(prototype.id + '-piePanel');
        
        if(vPanel.isVisible()){ 
            vgridData.setWidth(1200);
            vPag.setWidth(1200);
            vpanelResult.setWidth(1200);
            vPanel.setVisible(false);
        }else{
            vgridData.setWidth(600);
            vPag.setWidth(600);
            vpanelResult.setWidth(600);
            vPanel.setVisible(true);
        }
        /*Ext.getCmp(prototype.id + '-campo' + (i + 1)).hide();
        Ext.getCmp(prototype.id + '-panelLabelPagination').show();*/
        
    },
    onClickImgInfo: function() {

        var tabla = Ext.getCmp(prototype.id + '-cmbTabla').getValue();
         var tabla2 = Ext.getCmp(prototype.id + '-cmbTabla2').getValue();
        Ext.create('Ext.Praxis.view.gerencial.BusinessToolsForm.DataEntryHelp', {
            id: prototype.id + '-dataEntryHelp',
            params: {
                tabla: tabla,
                tabla2: tabla2
            }
        }).show();
    },
    onClickImgSave: function() {

        var tabla = Ext.getCmp(prototype.id + '-cmbTabla').getValue();
        Ext.create('Ext.Praxis.view.gerencial.BusinessToolsForm.DataEntrySaveQuery', {
            id: prototype.id + '-dataEntrySaveQuery',
            params: {
                tabla: tabla,
                tabla2: ''
            }
        }).show();
    },
    onChangeCmbTabla: function(args, obj ,newValue , oldValue , event ) {
        console.log('1-' +obj + ' =====' + args + '······newValue=' + newValue + '?????oldValue=' + oldValue + 'FIN' + event + '<----');
        //console.log(value);
        if (newValue !== '' && newValue !== '#') {
            win.lblUser_toolTip("Estructura: " + Ext.getCmp(prototype.id + '-cmbTabla').getValue());
            this.changeFile(args, 0);
        }
    },
    changeFile: function(tipo, dato) {
        console.log('changeFile');
        var tabla = Ext.getCmp(prototype.id + '-cmbTabla').getValue();
        var tabla2 = Ext.getCmp(prototype.id + '-cmbTabla2').getValue();
        
        win.lblUser_toolTip("Estructura: " + tabla);
        if (tabla !== '') {
            if (tipo === 'Secundario') {
                this.obtainData(tabla, tabla2, dato);
            }
            else {
                this.obtainData(tabla, '', dato);
            }
        }
        
        //Panel para la funcion de valoracion
        if(tabla ==='A1692'){
            if(me.validateAccess('M')) {
                Ext.getCmp(prototype.id + '-boxFunctions').show();
            }
        }else{
            Ext.getCmp(prototype.id + '-boxFunctions').hide();
        }
        
        
    },
    obtainData: function(tabla, tabla2, dato) {
        Ext.Ajax.request({
            url: prototype.url + '/obtainData',
            params: {
                tabla: tabla,
                tabla2: tabla2
            },
            method: 'POST',
            beforerequest: Ext.getCmp(prototype.id + '-gridDataColumns').mask('Loading...'),
            success: function(response, options) {
                Ext.getCmp(prototype.id + '-gridDataColumns').unmask('Loading...');

                var res = Ext.JSON.decode(response.responseText);
                var resCampos = res.data;
                var resFav = res.dataFav;
                var resFiles = res.dataFiles;
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
//
//                bussinessTools.storeCampo.loadData(listaCampos);
//                Ext.getCmp(bussinessTools.id + '-cmbCampo1').setValue(listaCampos[0].code);
//                Ext.getCmp(bussinessTools.id + '-cmbCampo2').setValue(listaCampos[0].code);
//                Ext.getCmp(bussinessTools.id + '-cmbCampo3').setValue(listaCampos[0].code);
//                Ext.getCmp(bussinessTools.id + '-cmbCampo4').setValue(listaCampos[0].code);
//                Ext.getCmp(bussinessTools.id + '-cmbCampo5').setValue(listaCampos[0].code);
//                Ext.getCmp(bussinessTools.id + '-cmbCampo6').setValue(listaCampos[0].code);
//                Ext.getCmp(bussinessTools.id + '-cmbCampo7').setValue(listaCampos[0].code);
//
//                bussinessTools.store.loadData(listaCamposGrid); 
//
                if (dato === 0) {
                    var listaFav = [];
                    listaFav.push({code: "", name: "Select", helper: ""});
                    for (var i = 0; i < resFav.length; i++) {
                        var datos = {};
                        datos = {
                            code: resFav[i].strCodigo,
                            name: resFav[i].strCodigo + ' - ' + resFav[i].strDescrip,
                            helper: resFav[i].strDescrip
                        };
                        listaFav.push(datos);
                    }
                    var storeData = Ext.create('Ext.data.Store', {
                        data: listaFav,
                        autoLoad: true
                    });
                    Ext.getCmp(prototype.id + '-cmbFav').bindStore(storeData);
                    Ext.getCmp(prototype.id + '-cmbFav').setValue(listaFav[0].code);
                }

                if (resFiles !== undefined) {
                    var listaFile = [];
                    listaFile.push({TABNAME: '', DESCRIPT: 'Select',  SOURCEF: '',cli: '',USERFIELD: '',SYSTFIELD: '',strModul: ''});
                    var i = 0;
                    var mod = '';
                    for (var i = 0; i < resFiles.length; i++) {
                        if (i === 0 || mod !== resFiles[i].strModul) {
                            mod = resFiles[i].strModul;
                            listaFile.push({TABNAME: '#', DESCRIPT: resFiles[i].strModul,  SOURCEF: '',cli: '',USERFIELD: '',SYSTFIELD: '',strModul: ''});
                        }
                        var datos = {};
                        datos = {
                            TABNAME: resFiles[i].TABNAME,
                            DESCRIPT: resFiles[i].DESCRIPT,
                            SOURCEF: resFiles[i].SOURCEF,
                            USERFIELD: resFiles[i].USERFIELD,
                            cli: resFiles[i].TABNAME + '.' + resFiles[i].USERFIELD,
                            SYSTFIELD: resFiles[i].SYSTFIELD,
                            strModul: resFiles[i].strModul
                        };
                        listaFile.push(datos);
                    }
                    var storeData = Ext.create('Ext.data.Store', {
                        data: listaFile,
                        autoLoad: true
                    });
                    Ext.getCmp(prototype.id + '-cmbTabla2').bindStore(storeData);
                    Ext.getCmp(prototype.id + '-cmbTabla2').setValue('');
                }
//          
//                Ext.getCmp(bussinessTools.id + '-panelGridField').removeAll();
//                var panelGrid = bussinessTools.generaGridFields(listaCamposGrid);
//                Ext.getCmp(bussinessTools.id + '-panelGridField').add(panelGrid);

                var storeData = Ext.create('Ext.data.Store', {
                    data: listaCamposGrid,
                    autoLoad: true
                });
                Ext.getCmp(prototype.id + '-gridDataColumns').bindStore(storeData);
                
                if(dato===1){
                    me.armarData(me.resObtainDataFavoritos);
                }
                
            }});
        
        console.log(me.listaCampos);
    },
    setStoreData: function() {
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
        
        var cmbTabla = Ext.getCmp(prototype.id + '-cmbTabla');
        cmbTabla.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ['', 'Select'],
                ["CAF020", "Cargo Conciliation"]
            ]}));
        cmbTabla.setValue('');

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
        
        var cmbFunctions = Ext.getCmp(prototype.id + '-cmbFunctions');
        cmbFunctions.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ['', 'Select'],
                ["1", "Valoración"]
            ]}));
        cmbFunctions.setValue('');

        Ext.Ajax.request({
            url: prototype.url + '/loadFiles',
            method: 'POST',
            timeout: 60000000,
            beforerequest: Ext.getBody().mask('Loading...'),
            params: {
                tabla: ''
            },
            success: function(response, options) {
                Ext.getBody().unmask('Loading...');
                var res = Ext.JSON.decode(response.responseText);
                var data = res.data;
                var lstOperadores = res.lstOperadores;
                var newData = [];
                newData.push({TABNAME: '', DESCRIPT: 'Select',  SOURCEF: '',cli: '',USERFIELD: '',SYSTFIELD: '',strModul: ''});
                var dataOP = [];
                dataOP.push({data: "", label: "All", help: ""});
                var mod = '';
                for (var i = 0; i < data.length; i++) {
                    if (i === 0 || mod !== data[i].strModul) {
                        mod = data[i].strModul;
                        var item = { TABNAME: '#', DESCRIPT: data[i].strModul,  SOURCEF: '',cli: '',USERFIELD: '',SYSTFIELD: '',strModul: ''};
                        newData.push(item);
                    }
                    var item = {
                        TABNAME: data[i].TABNAME,
                        DESCRIPT: data[i].DESCRIPT,
                        SOURCEF: data[i].SOURCEF,
                        USERFIELD: data[i].USERFIELD,
                        cli: data[i].TABNAME + '.' + data[i].USERFIELD,
                        SYSTFIELD: data[i].SYSTFIELD,
                        strModul: data[i].strModul

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
                Ext.getCmp(prototype.id + '-cmbTabla').bindStore(storeData);
                Ext.getCmp(prototype.id + '-cmbTabla').setValue('');
                
                var storeDataOP = Ext.create('Ext.data.Store', {
                    data: dataOP,
                    autoLoad: true
                });
                Ext.getCmp(prototype.id + '-cmbOperador1').bindStore(storeDataOP);
                Ext.getCmp(prototype.id + '-cmbOperador2').bindStore(storeDataOP);
                Ext.getCmp(prototype.id + '-cmbOperador3').bindStore(storeDataOP);
                Ext.getCmp(prototype.id + '-cmbOperador4').bindStore(storeDataOP);
                Ext.getCmp(prototype.id + '-cmbOperador5').bindStore(storeDataOP);
                Ext.getCmp(prototype.id + '-cmbOperador6').bindStore(storeDataOP);
                Ext.getCmp(prototype.id + '-cmbOperador7').bindStore(storeDataOP);
                Ext.getCmp(prototype.id + '-cmbOperador1').setValue('');
                Ext.getCmp(prototype.id + '-cmbOperador2').setValue('');
                Ext.getCmp(prototype.id + '-cmbOperador3').setValue('');
                Ext.getCmp(prototype.id + '-cmbOperador4').setValue('');
                Ext.getCmp(prototype.id + '-cmbOperador5').setValue('');
                Ext.getCmp(prototype.id + '-cmbOperador6').setValue('');
                Ext.getCmp(prototype.id + '-cmbOperador7').setValue('');
            }
        });
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
        var IN_TABLA = Ext.getCmp(prototype.id + '-cmbTabla').getValue();
        var IN_TABLA2 = Ext.getCmp(prototype.id + '-cmbTabla2').getValue();
        var strCliente = this.obtenerDatoCombo('-cmbTabla', 'TABNAME', 'cli');
        var IN_SOURCEF = this.obtenerDatoCombo('-cmbTabla', 'TABNAME', 'SOURCEF');
        var IN_SOURCEF2 = this.obtenerDatoCombo('-cmbTabla2', 'TABNAME', 'SOURCEF');
        var strOrderBy = this.createOrderBy();
        var strOrderByEtiquetas = me.orderbyEtiquetas;
        var check = Ext.getCmp(prototype.id + '-chkSelGB').checked;

        var v_flag_cpn_sale ='';
        if(IN_TABLA === 'A1692' && IN_TABLA2 === 'A720'){
            v_flag_cpn_sale ='1';
        }

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
            RN: '',
            IN_FLAG_CPN_SALE:v_flag_cpn_sale,
            IN_VALID_MFSTO:''
        };


        if (check) {
            this.createQuerySelectGroupBy();
        } else {
            this.createQuerySelect();
        }
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
    configurarGrid: function() {
//        this.hideColumns();
        var arr2 = Ext.getCmp(prototype.id + '-panelListColumns').getStore().data.items;
        var numColumns = me.searchParams.RN;
        var check = Ext.getCmp(prototype.id + '-chkSelGB').checked;
        var anchoGrilla = numColumns * 100 + 2;
        if (anchoGrilla > 500) {
            anchoGrilla = 502;
        }
        if (check && (numColumns>0)) {
            anchoGrilla = anchoGrilla + 100;
        }

        Ext.getCmp(prototype.id + '-panelLabelPagination').show();
        
        
        
        if (Ext.getCmp(prototype.id + '-gridDanamic')) {
            Ext.getCmp(prototype.id + '-gridDanamic').destroy();
        }
        var v_panelResult = Ext.getCmp(prototype.id + '-panelResult');
        var myGrid = Ext.create('Ext.grid.Panel', {
            id: prototype.id + '-gridDanamic',
            cls: 'gridCss',
            padding: '20 0 0 0',
            bodyStyle: 'background: transparent;',
            columnLines: true,
            enableColumnMove: true,
            features: [{
                    ftype: 'summary',
                    dock: 'bottom'
                }],
            store: {
                fields: ['data']
            }
//            ,
//            columns: [
//                { text: 'Name',  dataIndex: 'name' },
//                { text: 'Email', dataIndex: 'email' }
//            ]
        });


        var arr2 = Ext.getCmp(prototype.id + '-panelListColumns').getStore().data.items;
        var numColumns = me.searchParams.RN;
        console.log(arr2);
/*
 * 
 * 
        var vPanel = Ext.getCmp(prototype.id + '-panelSelectField');
        
        var vgridData = Ext.getCmp(prototype.id + '-gridDanamic');
        var vpanelResult = Ext.getCmp(prototype.id + '-panelResult');
        var vpanelPag = Ext.getCmp(prototype.id + '-piePanel');
        
 * */
//        var v_boxContenedorGrid = Ext.getCmp(prototype.id + '-boxContenedorGrid');
        var vPanel = Ext.getCmp(prototype.id + '-panelSelectField');
        var vPag = Ext.getCmp(prototype.id + '-panelLabelPagination');

        var vgridData = Ext.getCmp(prototype.id + '-gridDanamic');

        if(vPanel.isVisible()){ 
            v_panelResult.setWidth(600);
            vgridData.setWidth(600);
            vPag.setWidth(600);
        }else{
            v_panelResult.setWidth(1200);
            vgridData.setWidth(1200);
            vPag.setWidth(1200);
        }

//        var gridView2 = Ext.getCmp(prototype.id + '-gridDanamic');

        v_panelResult.insert(0, myGrid);
    },
    configurarGridData: function() {
        console.log ('configurarGridDataaaaaa');
        
        var arr2 = Ext.getCmp(prototype.id + '-panelListColumns').getStore().data.items;
        var numColumns = me.searchParams.RN;
        var vgridData = Ext.getCmp(prototype.id + '-gridDanamic');
        
        var column1 = Ext.create('Ext.grid.column.Column', {text: 'RN', width: 50, align: 'center', dataIndex: 'RN'});
        vgridData.headerCt.insert(0, column1);
        vgridData.getView().refresh();

        

        for (var i = 0; i < numColumns; i++) {
//            var gridView = Ext.getCmp(prototype.id + '-gridDanamic');
            var v_nroColumna = (i+1);
            var v_align = 'center';
            if (arr2[i].data["DATATYPE"] === 'N') {
                v_align = 'right';
            } else if (arr2[i].data["size"] > 50) {
                v_align = 'left';
            }
            var v_cabecera =arr2[i].data["DCOLHDG"];
            var v_fields = Ext.getCmp(prototype.id + '-panelListColumns').getStore().getData().items[i].data;
            var v_columnaGrid = me.retornaColumna(v_cabecera,v_nroColumna,v_align,v_fields);

//            var column = Ext.create('Ext.grid.column.Column', {text: arr2[i].data["DCOLHDG"], dataIndex: 'column' + (v_nroColumna), align: v_align
//                        ,summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
//                                        var data_store = Ext.getCmp(prototype.id + '-gridDanamic').getStore().getData().items[0].data;
//                                        var v_valor = 'tot'+(v_nroColumna);
//                                        console.log ('-----abc>');
//                                        console.log (v_valor);
//                                        console.log (data_store[v_valor]);
//                                      return v_nroColumna;
////                                    var data = Ext.getCmp(prototype.id + '-gridDanamic').getStore().getData().items[0].data;
////                                    //metaData.style = 'text-align:right; margin-right:3px ';
////                                    var fields = Ext.getCmp(prototype.id + '-panelListColumns').getStore().getData().items[i].data;
////                                    var total_campos = Ext.getCmp(prototype.id + '-panelListColumns').getStore().getData().length;
////                                    if (total_campos >= i+1) {
////                                        if (fields.DATATYPE === 'N') {
////                                            return '<b>' + Ext.util.Format.number(data.tot41, '0,000') + '<b>';
////                                        } else {
////                                            return value;
////                                        }
////                                    }
//                        }
//            });
            
            
            vgridData.headerCt.insert(v_nroColumna, v_columnaGrid);            
            vgridData.getView().refresh();

//            console.log(i+'-->'+Ext.getCmp(prototype.id+'-gridDanamic').columns.length);
        }
        
        var tabla = Ext.getCmp(prototype.id + '-cmbTabla').getValue();
        var tabla2 = Ext.getCmp(prototype.id + '-cmbTabla2').getValue();
        if(tabla === 'A1692' && tabla2 === 'A720' && Ext.getCmp(prototype.id + '-cmbFunctions').getValue()==='1'){
            
//            var gridView_d = Ext.getCmp(prototype.id + '-gridDanamic');
            
            var column_1ast = Ext.create('Ext.grid.column.Column', {text: 'Sale Date', width: 100, align: 'center', dataIndex: 'A720FECVTA'
            ,renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = 'text-align:center;background:#d5f4d5;';
                            return value;
                        }
            });
            vgridData.headerCt.insert(numColumns+1, column_1ast);
            vgridData.getView().refresh();

            var column_1ast2 = Ext.create('Ext.grid.column.Column', {text: 'FVLO Sale', width: 100, align: 'center', dataIndex: 'A720FVLO'
            ,renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = 'text-align:center;background:#d5f4d5;';
                            return value;
                        }
            });
            vgridData.headerCt.insert(numColumns+2, column_1ast2);
            vgridData.getView().refresh();
            
            var column_1ast3 = Ext.create('Ext.grid.column.Column', {text: 'NVLO Sale', width: 100, align: 'center', dataIndex: 'A720NVLO'
            ,renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = 'text-align:center;background:#d5f4d5;';
                            return value;
                        }
            });
            vgridData.headerCt.insert(numColumns+3, column_1ast3);
            vgridData.getView().refresh();
            
            var column_1ast4 = Ext.create('Ext.grid.column.Column', {text: 'Orig Sale', width: 100, align: 'center', dataIndex: 'A720RUTA_0'
            ,renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = 'text-align:center;background:#d5f4d5;';
                            return value;
                        }
            });
            vgridData.headerCt.insert(numColumns+4, column_1ast4);
            vgridData.getView().refresh();
            
            var column_1ast5 = Ext.create('Ext.grid.column.Column', {text: 'Dest Sale', width: 100, align: 'center', dataIndex: 'A720RUTA_1'
            ,renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = 'text-align:center;background:#d5f4d5;';
                            return value;
                        }
            });
            vgridData.headerCt.insert(numColumns+5, column_1ast5);
            vgridData.getView().refresh();
            
            var column_1ast6 = Ext.create('Ext.grid.column.Column', {text: 'VALUE', width: 100, align: 'center', dataIndex: 'A720VALOR'
            ,renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = 'text-align:right;background:#d5f4d5;';
                            return value;
                        }
            });
            vgridData.headerCt.insert(numColumns+6, column_1ast6);
            vgridData.getView().refresh();
        }
        
        
    },
    retornaColumna: function(v_cabecera,v_columna,v_align,v_fields) {
        
            var column = Ext.create('Ext.grid.column.Column', {text: v_cabecera, dataIndex: 'column' + (v_columna), align: v_align
                        ,summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                            var data_store = Ext.getCmp(prototype.id + '-gridDanamic').getStore().getData().items[0].data;
                            var v_valor = 'tot'+(v_columna);
                            
                            
                            if (v_fields.DATATYPE === 'N') {
                                return '<b>' + Ext.util.Format.number(data_store[v_valor], '0,000') + '<b>';
                            } else {
                                return '';
                            }
                            
                            
//                          return data_store[v_valor];
                        }
            });
        
        return column;
    },
    hideColumns: function() {
        for (var i = 1; i < 63; i++) {
            Ext.getCmp(prototype.id + '-campo' + (i + 1)).hide();
        }
    },
    setGridData: function(obj, val) {

        this.configurarGrid();
        var storeGridDatas = Ext.create('Ext.Praxis.store.gerencial.GridData', {
            proxy: {
                url: prototype.url + '/searchFields'
            }, listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = {beanString : JSON.stringify(me.searchParams)};
                },
                load: function(obj) {
                    var pag = Ext.getCmp(prototype.id + '-paggin');
                    var pagData = pag.getPageData();
                    Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
                    Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
                    Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));

                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found.'
                        });
                    } else {
                          me.configurarGridData();
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
        
        Ext.getCmp(prototype.id + '-gridDanamic').bindStore(storeGridDatas);
        
        
        Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas);
//        console.log('=========');
//        
////        console.log('-->'+ print_t);
//        var completo_carga = false;
//        var cont = 0;
//        while (!completo_carga) {
//            var print_t = Ext.getCmp(prototype.id + '-gridDanamic').getStore().getData();
//             console.log('-->'+ print_t);
////            setTimeout(function() {
////                me.imprimeTime();
////            },2000);
//            cont +=1;
//            console.log('???'+cont);
//            //|| print_t.valueOf() !== 'undefined'
//            if(cont === 50000 ){
//                completo_carga=true;
//            }
//            console.log('fin');
//        }
//        setTimeout(function() {
//            me.configurarGridData(storeGridDatas);
//          
//        },2000);
        
//        Ext.getCmp(prototype.id + '-grafico01').bindStore(storeGridDatas);
    },
    imprimeTime: function() {
        console.log('1 seg');
        console.log(Ext.getCmp(prototype.id + '-gridDanamic').getStore().getData().items[0].data);
    },
    changecmbCampo: function(nbr) {
        var idtxt ='-txtCampo' + nbr;
        var idcmb ='-cmbCampo' + nbr;
        Ext.getCmp(prototype.id + idtxt).setValue(Ext.getCmp(prototype.id + idcmb).getValue());

        /*if(Ext.getCmp(prototype.id + idcmb).getValue() === null){
            Ext.getCmp(prototype.id + idcmb).getStore().load();
            Ext.getCmp(prototype.id + idtxt).setValue('');
        }else{
//        console.log(Ext.getCmp(prototype.id + idtxt));
            Ext.getCmp(prototype.id + idtxt).setValue(Ext.getCmp(prototype.id + idcmb).getValue());
        }*/
        
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
        
        if (obj.value !== '') {
            var tabla = Ext.getCmp(prototype.id + '-cmbTabla').getValue();
            var codigo = Ext.getCmp(prototype.id + '-cmbFav').getValue();

            Ext.Ajax.request({
                url: prototype.url + '/obtainDataFavoritos',
                params: {tabla: tabla, codigo: codigo},
                method: 'POST',
                beforerequest: Ext.getCmp(prototype.id + '-gridDataColumns').mask('Loading...'),
                success: function(response, options) {
                    storeList.removeAll();
                    var res = Ext.JSON.decode(response.responseText);
                    res = res.data;
                    me.resObtainDataFavoritos = res;
                    if (res[0].IN_TABLA2.trim() !== '') {
                        Ext.getCmp(prototype.id + '-cmbTabla2').setValue(res[0].IN_TABLA2.trim());
//                        prototype.ChangeFile('Secundario', 1);
                        me.changeFile('Secundario', 1);
                        
                    }else{
                        
                        me.armarData(me.resObtainDataFavoritos);
                    }
                }
            });
        }
    },
    armarData: function(res) {
        
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
            Ext.getCmp(prototype.id + '-chkSelGB').setValue(res[0].chkGroup);
            me.displayQuery(res[0].strSQL);
            Ext.getCmp(prototype.id + '-cmbTipoFecha').setValue(res[0].strFecha.trim());
//                    me.btnSearch_click();

//            console.log(twait);
            Ext.getCmp(prototype.id + '-gridDataColumns').unmask('Loading...');
        }, 400);
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
        Ext.getCmp(prototype.id + '-cmbCampo4').setValue(param[12]);
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
    btnDisplay_click: function() {
        var option = Ext.getCmp(prototype.id + '-panelGraficos');
        if (option.isVisible()) {
            option.setVisible(false);
        } else {
            option.setVisible(true);
        }
    }
    , btnClear_click: function(obj, e) {
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
                        
                        
//                        var grid = Ext.getCmp(prototype.id + '-gridData');
                        
                        this.setFormatParameter();
                        var data = me.searchParams;

                        //var schema = JSON.stringify({text: "", columns: grid.config.columns.items});
                        var schema = JSON.stringify({text: "", columns: this.getColumns()});
                        data.schema = schema;

                        me.searchParams = data;
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
    changeFunction: function() {
        
        if(Ext.getCmp(prototype.id + '-cmbFunctions').getValue()==='') {
            Ext.getCmp(prototype.id + '-btnFunct').setDisabled(true);
        }else{
            Ext.getCmp(prototype.id + '-btnFunct').setDisabled(false);
        }
        
    },
    procesar_function: function(obj, e) {
        
        
        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: 'Confirm the process?',
            buttons: Ext.MessageBox.OKCANCEL,
            scope: this,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function(btn) {
                if (btn === 'ok') {
                    this.process_valuation();
                }
            }
        });
    },
    process_valuation: function() {
        me.searchParams.IN_VALID_MFSTO = '';
        if(Ext.getCmp(prototype.id + '-chkManifiesto').getValue()){
            me.searchParams.IN_VALID_MFSTO = 'N';
        }
        
//        console.log(me.searchParams);
         Ext.Ajax.request({
            url: prototype.url + '/executeValuation' ,
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
                        
                        
//                        var grid = Ext.getCmp(prototype.id + '-gridData');
                        
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
                        
                        me.searchParams = data;
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
    //<editor-fold defaultstate="collapsed" desc="validateProgram">
    validateProgram: function( nprog) {
//        console.log('------- validateProgram ---------');
//        console.log('------- nprog ' + nprog);
//        console.log('------- opcion  ' +opcion);
        Ext.Ajax.request({
            url: prototype.urlMaster + '/validateUserProgramAccess',
            method: 'POST',
            timeout: 60000000,
            params: {nprog: nprog || ''},
            success: function(response, opts) {
//                console.log(response);
                var res = Ext.JSON.decode(response.responseText);
                if (res.success) {
                    me.info_perm = res.matrix;
                } else
                    global.Msg({msg: res.sesion});
            },
            failure: function(response, opts) {
                console.log('server-side failure with status code ' + response.status);
            }
        });
    },
    validateAccess: function(opcion) {
        var info = me.info_perm;
        var bolRtn = false;
        switch (opcion)
        {
            case "A":
                if (info.PERMA === "Y")
                    bolRtn = true;
                break;
            case "L":
                if (info.PERML === "Y" || info.PERMC === "Y" || info.PERMM === "Y" || info.PERME === "Y")
                    bolRtn = true;
                break;
            case "C":
                if (info.PERMC === "Y")
                    bolRtn = true;
                break;
            case "M"://Modificar
                if (info.PERMM === "Y")
                    bolRtn = true;
                break;
            case "E":
                if (info.PERME === "Y")
                    bolRtn = true;
                break;
            case "X":
                if (info.PERMX === "Y")
                    bolRtn = true;
                break;
        }

        return bolRtn;
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
