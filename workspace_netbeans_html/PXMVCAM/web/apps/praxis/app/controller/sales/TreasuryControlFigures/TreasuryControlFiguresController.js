Ext.define('Ext.Praxis.controller.sales.TreasuryControlFigures.TreasuryControlFiguresController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.TreasuryControlFiguresController',
    bean: {},
    beanDet: {},
    beanDet02: {},
    beancf: {},
    _path: '',
    lstControlfiguresRep: new Array(),
    init: function(view) {
        
        //Renombrar URL para usar los mismos controlados JAVA
        var url_original = prototype.url;        
        array_url = url_original.split('/');
//        console.log(array_url);
        prototype.url = '/'+ array_url[1] + '/ControlFigures';
//        console.log(prototype.url);
//        prototype.url = '/AEROMEXICO/ControlFigures';
    },
    afterRender: function () {
        win.focus('txtTypeOfDate_00');
    },
    //<editor-fold defaultstate="collapsed" desc="change">
    CmbDate_clickHandler: function() {
        var selectedValue = win.getValue('cmbTypeDate');
        this.limpiar_grid();
        switch(selectedValue){
            case '1': case '2': case '3':case '5':
                Ext.getCmp(prototype.id+'-BoxFilter01').show();
                Ext.getCmp(prototype.id+'-BoxFilter02').hide();
                Ext.getCmp(prototype.id+'-BoxFilter03').show();
                win.setValue('txtTypeOfDate_00', '');
                win.setValue('txtTypeOfDate_01', '');
                win.focus('txtTypeOfDate_00');
                break;
            case '4':
                Ext.getCmp(prototype.id+'-BoxFilter01').setVisible(false);
                Ext.getCmp(prototype.id+'-BoxFilter02').setVisible(true);
                Ext.getCmp(prototype.id+'-BoxFilter03').setVisible(false);
                win.setValue('txtA1530GRUPO');
                win.focus('txtA1530GRUPO');
                break;
        }
    },
    CmbSource_clickHandler: function() {
        var selectedValue = win.getValue('cmbSource');
        switch(selectedValue){
            case 'BSP': case 'MAN':
                Ext.getCmp(prototype.id+'-LblCountry').setVisible(true);
                Ext.getCmp(prototype.id+'-IN_A1530PSVTA').setVisible(true);
                Ext.getCmp(prototype.id+'-LblBank').setVisible(false);
                Ext.getCmp(prototype.id+'-cmbBank').setVisible(false);
                Ext.getCmp(prototype.id+'-LblDistChan').setVisible(false);
                Ext.getCmp(prototype.id+'-IN_A1530SFUEN').setVisible(false);
                Ext.getCmp(prototype.id+'-Lbl_IATACode').setVisible(false);
                Ext.getCmp(prototype.id+'-IN_A1530AGENT').setVisible(false);
                Ext.getCmp(prototype.id+'-Lbl_SabreCity').setVisible(false);
                Ext.getCmp(prototype.id+'-txtA1530CSABR').setVisible(false);
                win.setValue('IN_A1530PSVTA', '');
                win.focus('IN_A1530PSVTA');
                break;
            case 'ARC':
                Ext.getCmp(prototype.id+'-LblCountry').setVisible(false);
                Ext.getCmp(prototype.id+'-IN_A1530PSVTA').setVisible(false);
                Ext.getCmp(prototype.id+'-LblBank').setVisible(true);
                Ext.getCmp(prototype.id+'-cmbBank').setVisible(true);
                Ext.getCmp(prototype.id+'-LblDistChan').setVisible(false);
                Ext.getCmp(prototype.id+'-IN_A1530SFUEN').setVisible(false);
                Ext.getCmp(prototype.id+'-Lbl_IATACode').setVisible(false);
                Ext.getCmp(prototype.id+'-IN_A1530AGENT').setVisible(false);
                Ext.getCmp(prototype.id+'-Lbl_SabreCity').setVisible(false);
                Ext.getCmp(prototype.id+'-txtA1530CSABR').setVisible(false);
                break;
            case 'ASR':
                Ext.getCmp(prototype.id+'-LblCountry').setVisible(true);
                Ext.getCmp(prototype.id+'-IN_A1530PSVTA').setVisible(true);
                Ext.getCmp(prototype.id+'-LblBank').setVisible(false);
                Ext.getCmp(prototype.id+'-cmbBank').setVisible(false);
                Ext.getCmp(prototype.id+'-LblDistChan').setVisible(true);
                Ext.getCmp(prototype.id+'-IN_A1530SFUEN').setVisible(true);
                Ext.getCmp(prototype.id+'-Lbl_IATACode').setVisible(true);
                Ext.getCmp(prototype.id+'-IN_A1530AGENT').setVisible(true);
                Ext.getCmp(prototype.id+'-Lbl_SabreCity').setVisible(true);
                Ext.getCmp(prototype.id+'-txtA1530CSABR').setVisible(true);
                win.setValue('IN_A1530PSVTA', '');
                win.focus('IN_A1530PSVTA');
                break;
        }
    },
    //</editor-fold>   
    //<editor-fold defaultstate="collapsed" desc="onViewClick">
    gridData_act1_clickHandler: function(column, e, row, column, x, rowData) {
        var data = x.record.data;
        var strTIPO = data.A1720TIPO.trim();
        var strSTIPO = data.A1720STIPO.trim();
        
        if ( strTIPO === 'FA' || strTIPO === 'CA' || strTIPO === 'CM' || strTIPO === 'TX' ){
            // PARA DETALLE DE IMPORTES **MEMOS
            switch( strSTIPO ) 
            {   
                // A714:ACM
                case "ACMA": 
                case "ACMD":
                case "ACNT":
                case "SPCR":
                case "SSAC":
                case "ACMS":						 	
                // A714:ADM  
                case "ADMA":
                case "ADMD":
                case "ADNT":
                case "SPDR":
                case "SSAD":
                case "RCSM":
                case "ADMS":
                // CASH MEMO
                case "C*" : case "CA*": 
                // OTHER
                case "TAAD":
                // TAX MEMO
                case "ZZ*":			
                // COMM MEMO
                case "CM*":
                // TSCM MEMO
                case "CO*":
                // TTXC MEMO
                case "VC*":
                    this.gridData_act1_clickHandler_02(data); 
                break;
                // A720
                default: 
                    this.gridData_act1_clickHandler_01(data); 
                break;		
            }
        } else {
            this.gridData_act1_clickHandler_01(data);
        }
    },
    gridData_act2_clickHandler: function (column, e, row, column, x, rowData) {
        var data = x.record.data;
        // Array Groups: A1530
	var A1530GROUPS="";
	var rows = {};
	for(var i=0; i<this.lstControlfiguresRep.length; i++){
            rows = this.lstControlfiguresRep[i];
            if ( i===0 ) A1530GROUPS = rows.A1530GRUPO;
            else A1530GROUPS = A1530GROUPS +'|'+ rows.A1530GRUPO;				
	}
	if(win.getValue("txtGroupSelected") !== "" ){
            A1530GROUPS = win.getValue("txtGroupSelected");
	}
	// Add Param
	data.A1530GROUPS = A1530GROUPS;	
	data.CCUST = "139";
        
	// Title Windonw
        var dataEntry2 = Ext.create('Ext.Praxis.view.sales.ControlFiguresForm.DataEntryDetailRef', {
            id: 'DataEntryDetailRefControlFiguresForm'
        });
        
        var controller = dataEntry2.getController();
        controller.gridA1720 = data;
        
        dataEntry2.show();
    },
    execSearchGroupDet: function (column, e, row, column, x, rowData) {
        var data = x.record.data;
        win.setValue('txtGroupSelected', data.A1530GRUPO);
        this.beanDet.IN_A1720CCUST = data.A1530CCUST;
        this.beanDet.IN_A1720GRUPO = data.A1530GRUPO;
        var title = 'Original Currency '+ data.A1530MDA;
        this.searchDet(this.beanDet, title);
        this.execSearchGroupDet_02(data, title);
    },
    //</editor-fold>
    
    execSearchDet: function(pA1720CCUST, pA1720GRUPO, title) {
        this.beanDet.IN_A1720CCUST = pA1720CCUST; //'139';
        this.beanDet.IN_A1720GRUPO = pA1720GRUPO; //'54130401|00056145';
        this.searchDet(this.beanDet, title);
    },
    execSearchDet_02: function(pA1720CCUST, pA1720GRUPO, title) {
        this.beanDet02.IN_A1875CCUST = pA1720CCUST;
        this.beanDet02.IN_A1875GRUPO= pA1720GRUPO;
        this.getSQP00133(this.beanDet02, title);
    },
    
    // <editor-fold defaultstate="collapsed" desc="Options">
    imgSearch_clickHandler: function(obj, e) {
        var VL_TYPEDATE = win.getValue('cmbTypeDate');
        this.bean.VP_OPCION  = VL_TYPEDATE;
        this.bean.VP_FECHA01 = '';
        this.bean.VP_FECHA02 = '';			 	
        this.bean.VP_A1530FUENT ='';  // -- SOURCE
        this.bean.VP_A1530SFUEN ='';  // -- SUB FUENTE (SOLO SI ES ASR )			
        this.bean.VP_A1530AGENT ='';  // -- IATA (SOLO SI ES: ASR)	
        this.bean.VP_A1530MDA   ='';  // -- MONEDA 
        this.bean.VP_A1530STPRO ='';  // -- DATA VALIDATE (YES,NOT,ALL) 	
        this.bean.VP_A1530PSVTA = ''; // -- SI ES: BSP
        this.bean.VP_A1530CIUVT = ''; // -- SI ES: ARC
        this.bean.VP_A1530CSABR = ''; // -- SI ES: ARC
        this.bean.VP_A1530GRUPO = '';
        switch(VL_TYPEDATE){
            case '1': case '2': case '3': case '5':
                this.bean.VP_FECHA01 = Ext.util.Format.date(win.getValue('txtTypeOfDate_00'), 'Ymd');
                this.bean.VP_FECHA02 = Ext.util.Format.date(win.getValue('txtTypeOfDate_01'), 'Ymd');
                this.bean.VP_A1530FUENT = win.getValue("cmbSource");    	//	-- SOURCE
                this.bean.VP_A1530MDA   = win.getValue("IN_A1530MDA");  // -- MONEDA
                this.bean.VP_A1530STPRO = win.getValue("rbgCtlStpro").rbgCtlStpro;		    // -- DATA VALIDATE (YES,NOT,ALL)						
                if(  this.bean.VP_FECHA01 === ""  ){
                    win.focus('txtTypeOfDate_00');
                    global.Msg({msg: 'Required Field, Date from '});
                    return;
                }
                if( this.bean.VP_FECHA02 === ""  ){
                    win.focus('txtTypeOfDate_01');
                    global.Msg({msg: 'Required Field, Date To '});
                    return;
                } 
                if( this.bean.VP_A1530FUENT === ""  ){
                    win.focus('cmbSource');
                    global.Msg({msg: 'Required Field, Source '});
                    return;
                }	
                if( this.bean.VP_A1530MDA === ""  ){
                    win.focus('IN_A1530MDA');
                    global.Msg({msg: 'Required Field, Currency '});
                    return;
                }
                
                //if (bean.VP_FECHA01 != "" && bean.VP_FECHA02 != "" ){					
                //	//	1 segundo son ----> 1000 milisegundos
                //	//	1 minuto son ------> 60 segundos
                //	//	1 hora son ---------> 60 minutos
                //	//	1 día son -----------> 24 horas	
                //	var fecha1:Date = new Date(bean.VP_FECHA01+" 00:00 AM");
                //	var fecha2:Date = new Date(bean.VP_FECHA02+" 11:59 PM");					
                //	var qtyHOURS:Number = dateUtils.dateDiff( fecha1, fecha2, dateUtils.HOURS );					
                //	var qtyDAY:Number	= qtyHOURS / 24; 	// CANTIDAD DE DIAS 720/24 = 30DIAS
                //	var qtyMONHT:Number = qtyDAY / 30; 		// CANTIDAD DE MESES 30/30 = 01MES					
                //	if ( qtyMONHT > 4 ){
                //		Alert.show( 'El rango de fechas supera los 4 meses, pueda que la consulta no se ejecute correctamente, utilice la opcion descarga directa en formato texto ');	
                //	} 			
                //	Alert.show('from:'+bean.VP_FECHA01+ ' to : '+ bean.VP_FECHA02 + ' dif:' + qtyMONHT );					
                //}

                // SOURCE
                switch(this.bean.VP_A1530FUENT){
                    case 'ASR':
                        this.bean.VP_A1530AGENT = win.getValue("IN_A1530AGENT");
                        this.bean.VP_A1530PSVTA = win.getValue("IN_A1530PSVTA"); 	//new
                        //bean.VP_A1530SFUEN = app.trim(IN_A1530SFUEN.text);			 	//new
                        var VP_A1530SFUEN = win.getValue("IN_A1530SFUEN");	//new
                        this.bean.VP_A1530SFUEN = VP_A1530SFUEN;									//new				 		
                        this.bean.VP_A1530CSABR = win.getValue("txtA1530CSABR");
                        break;
                    case 'ARC':
                        this.bean.VP_A1530CIUVT = win.getValue("cmbBank");
                        break;
                    case 'BSP': case 'MAN':
                        this.bean.VP_A1530PSVTA = win.getValue("IN_A1530PSVTA");
                    break;
                }
                break;
            case '4':
                this.bean.VP_A1530GRUPO = win.getValue('txtA1530GRUPO');
                break;
        }
        this.limpiar_grid();
        this.search(this.bean);
    },
    imgFilter_clickHandler: function() {
        var option = Ext.getCmp(prototype.id+'-contentFilter');
        if (option.isVisible()) option.hide();
        else option.show();
    },
    imgExcel_clickHandler: function(obj, e) {
        var file = {};
        var vA1530GRUPO = '';
        var beanDet = {};
        // Validar que exista consulta procesada
        if(this.lstControlfiguresRep.length > 0){
            file = this.lstControlfiguresRep[0];
            // Envia en cadena todos los grupos buscados
            for(var i = 0; i < this.lstControlfiguresRep.length; i++){
                file = this.lstControlfiguresRep[i];
                if ( i===0 ) vA1530GRUPO = file.A1530GRUPO;
                else vA1530GRUPO = vA1530GRUPO +'|'+ file.A1530GRUPO;
            }
            //cargar data de los grupos seleccionados
            beanDet.IN_A1720CCUST = file.A1530CCUST;
            beanDet.IN_A1720GRUPO = vA1530GRUPO;
            
            this.exportExcel('/getXLSX?beanString='+encodeURI(JSON.stringify(beanDet))+"&fileName=PX063-ControlFiguresDet_Group");
        } else {
            global.Msg({msg: 'Select filters and click Search '});
        }
    },
    imgTexto_clickHandler: function(obj, e) {
        // Parametro de busqueda	
        var VL_TYPEDATE = win.getValue("cmbTypeDate");
        this.beancf.VP_OPCION  = VL_TYPEDATE;
        this.beancf.VP_FECHA01 = '';
        this.beancf.VP_FECHA02 = '';			 	
        this.beancf.VP_A1530FUENT ='';	// -- SOURCE
        this.beancf.VP_A1530SFUEN ='';	// -- SUB FUENTE (SOLO SI ES ASR )			
        this.beancf.VP_A1530AGENT ='';	// -- IATA (SOLO SI ES: ASR)	
        this.beancf.VP_A1530MDA   ='';  // -- MONEDA 
        this.beancf.VP_A1530STPRO ='';	// -- DATA VALIDATE (YES,NOT,ALL) 	
        this.beancf.VP_A1530PSVTA = ''; // -- SI ES: BSP
        this.beancf.VP_A1530CIUVT = ''; // -- SI ES: ARC
        this.beancf.VP_A1530CSABR = ''; // -- SI ES: ARC
        this.beancf.VP_A1530GRUPO = '';		
        switch(VL_TYPEDATE){
            case '1': case '2': case '3': case '5':
                this.beancf.VP_FECHA01 = Ext.util.Format.date(win.getValue('txtTypeOfDate_00'), 'Ymd');
                this.beancf.VP_FECHA02 = Ext.util.Format.date(win.getValue('txtTypeOfDate_01'), 'Ymd');
                this.beancf.VP_A1530FUENT = win.getValue("cmbSource");    // -- SOURCE
                this.beancf.VP_A1530MDA   = win.getValue("IN_A1530MDA");  // -- MONEDA
                this.beancf.VP_A1530STPRO = win.getValue("rbgCtlStpro").rbgCtlStpro;  // -- DATA VALIDATE (YES,NOT,ALL)						
                if(  this.beancf.VP_FECHA01 === ""  ){
                    win.focus('txtTypeOfDate_00');
                    global.Msg({msg: 'Required Field, Date from '});
                    return;
                }
                if( this.beancf.VP_FECHA02 === ""  ){
                    win.focus('txtTypeOfDate_01');
                    global.Msg({msg: 'Required Field, Date To '});
                    return;
                } 
                if( this.beancf.VP_A1530FUENT === ""  ){
                    win.focus('cmbSource');
                    global.Msg({msg: 'Required Field, Source '});
                    return;
                }	
                if( this.beancf.VP_A1530MDA === ""  ){
                    win.focus('IN_A1530MDA');
                    global.Msg({msg: 'Required Field, Currency '});
                    return;
                }
                // SOURCE 
                switch(this.beancf.VP_A1530FUENT){
                    case 'ASR':
                        this.beancf.VP_A1530AGENT = win.getValue("IN_A1530AGENT");
                        this.beancf.VP_A1530PSVTA = win.getValue("IN_A1530PSVTA");//new				 		
                        var VP_A1530SFUEN = win.getValue("IN_A1530SFUEN");	//new
                        this.beancf.VP_A1530SFUEN = VP_A1530SFUEN;									//new				 		
                        this.beancf.VP_A1530CSABR = win.getValue("txtA1530CSABR");
                        break;
                    case 'ARC': this.beancf.VP_A1530CIUVT = win.getValue("cmbBank"); break;
                    case 'BSP': case 'MAN': this.beancf.VP_A1530PSVTA = win.getValue("IN_A1530PSVTA"); break;
                }
            break;
            case '4': this.beancf.VP_A1530GRUPO = win.getValue("txtA1530GRUPO"); break;
        }
        
        //console.log(this.beancf);
        //global.getFile(prototype.url + '/downloadText?beanString='+encodeURI(JSON.stringify(this.beancf)));
        
        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: 'Download Plain Text File ?',
            buttons: Ext.MessageBox.OKCANCEL,
            scope: this,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function(btn) {
                if (btn === 'ok') {                    
                    global.getFile(prototype.url + '/downloadText?beanString='+encodeURI(JSON.stringify(this.beancf)));                                        
                }
            }
        });
        
        
    },
    /*
    exportTxt: function(){
     this.setParams();
     global.getFile(prototype.url + '/downloadText?VP_ACTION=' + searchParams.VP_ACTION + '&A003KEY1=' + searchParams.A003KEY1 + '&A003KEY2=' + searchParams.A003KEY2 + '&A003KEY3=' + searchParams.A003KEY3);
    },    
    */
    imgClear_clickHandler: function(obj, e) {
        this.txtClear_imput();
        win.focus('txtTypeOfDate_00');
        this.limpiar_grid();
    },
    imgBack_clickHandler: function() {
        global.showMenu();
    },
    // </editor-fold>
    
    //<editor-fold defaultstate="collapsed" desc="search">
    search: function(bean) {        
        Ext.Ajax.request({
            url: prototype.url+'/search',
            method: 'POST',
            timeout: 60000000,
            params: { beanString: JSON.stringify(bean) },
            beforerequest: Ext.getCmp(prototype.id+'-gridControlLoadfigRep').mask('Loading...'),
            success: function(response, opts){
                win.lblUser_toolTip("Estructura: A1530,A1720,A1875");
                
                var res = Ext.JSON.decode(response.responseText);
                if (res.success) {
                    win.setValue('txtGroupSelected', '');
                    var vA1530GRUPO = '';
                    var vA1530CCUST='139'; //default 
                    
                    me.lstControlfiguresRep = res.lstControlfiguresRep;
                    
                    Ext.getCmp(prototype.id+'-gridControlLoadfigRep').bindStore(
                        Ext.create("Ext.Praxis.store.sales.GridData", { data: me.lstControlfiguresRep })
                    );
                    if (me.lstControlfiguresRep.length > 0) {
                        var file = me.lstControlfiguresRep[0];
                        var title = 'Original Currency '+ file.A1530MDA;
                        vA1530CCUST = file.A1530CCUST;
                        for (var i = 0; i < me.lstControlfiguresRep.length; i++) {
                            file = me.lstControlfiguresRep[i];
                            if ( i===0 ) vA1530GRUPO = file.A1530GRUPO;
                            else vA1530GRUPO = vA1530GRUPO +'|'+ file.A1530GRUPO;
                        }
                        //validar cantidad de grupos
                        if( vA1530GRUPO.length > 20024 ){
                            var strMSG = 'No se puede mostrar el detalle de la consulta, execede el limite de grupos permitidos.<br>'+
                                'Descargue el detalle completo en formato txt.';
                            global.Msg({ msg: strMSG });
                        }
                        //cargar detalle
			me.execSearchDet(vA1530CCUST, vA1530GRUPO, title);
			// cargar detalle Orinal
			me.execSearchDet_02(vA1530CCUST, vA1530GRUPO, title);
                    } else {
                        global.Msg({ msg: 'Data not found' });
                        me.limpiar_grid();
                    }
                } else global.Msg({ msg: res.sesion });
                Ext.getCmp(prototype.id+'-gridControlLoadfigRep').unmask();
            },
            failure: function(response, opts) {
                Ext.getCmp(prototype.id+'-gridControlLoadfigRep').unmask();
                console.log('server-side failure with status code '+response.status);
            }
        });
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="searchDet">
    searchDet: function(beanDet, title) {
        var contenedor = Ext.getCmp(prototype.id+'-boxDatail');
        contenedor.removeAll();
        Ext.Ajax.request({
            url: prototype.url+'/searchDet',
            method: 'POST',
            timeout: 60000000,
            params: { beanString: JSON.stringify(beanDet) },
            beforerequest: Ext.getCmp(prototype.id+'-tabControlfiguresDetail').mask('Loading...'),
            success: function(response, opts){
                Ext.getCmp(prototype.id+'-tabControlfiguresDetail').unmask();
                var res = Ext.JSON.decode(response.responseText);
                if (res.success) {
                    var data = res.lstControlfiguresDetRep;                    
                    //<editor-fold defaultstate="collapsed" desc="dataRoot">
                    var a= [];
                    var dataRoot = {text: '.', expanded: false, children:[]};                    
                    Ext.Object.each(data, function(index, value){
                        if ( a.indexOf(value.A1720NATUR_00) < 0 )
                        {
                            a.push(value.A1720NATUR_00);
                            dataRoot.children.push({
                                DESCRIPTION: value.A1720NATUR_00, 
                                A1720QTRSA : parseInt(value.A1720QTRSA), 
                                A1720VSALC : parseFloat(value.A1720VSALC), 
                                A1720QTRRF : parseInt(value.A1720QTRRF), 
                                A1720VRFLC: parseFloat(value.A1720VRFLC), 
                                A1720VNTLC : parseFloat(value.A1720VNTLC),                                                                 
                                A1720VSARV : parseFloat(value.A1720VSARV), 
                                A1720VRFRV : parseFloat(value.A1720VRFRV), 
                                A1720VNTRV : parseFloat(value.A1720VNTRV), 
                                LINK_DETAIL: '', 
                                LINK_DETAIL2: 'A',
                                A1720TIPO: value.A1720TIPO,
                                A1720STIPO: value.A1720STIPO,
                                expanded : false, children:[] });
                            var b = [];
                            Ext.Object.each(data, function(index, value01){
                                if ( value.A1720NATUR_00 === value01.A1720NATUR_00 ){
                                    if ( b.indexOf(value01.A1720TIPO_00) < 0 ){
                                        b.push(value01.A1720TIPO_00);
                                        dataRoot.children[a.indexOf(value.A1720NATUR_00)].children.push({
                                            DESCRIPTION: value01.A1720TIPO_00, 
                                            A1720QTRSA : parseInt(value01.A1720QTRSA), 
                                            A1720VSALC : parseFloat(value01.A1720VSALC), 
                                            A1720QTRRF : parseInt(value01.A1720QTRRF), 
                                            A1720VRFLC: parseFloat(value01.A1720VRFLC), 
                                            A1720VNTLC : parseFloat(value01.A1720VNTLC), 
                                            A1720VSARV : parseFloat(value01.A1720VSARV), 
                                            A1720VRFRV : parseFloat(value01.A1720VRFRV), 
                                            A1720VNTRV : parseFloat(value01.A1720VNTRV), 
                                            LINK_DETAIL: '',
                                            LINK_DETAIL2: 'B',
                                            A1720TIPO: value01.A1720TIPO,
                                            A1720STIPO: value01.A1720STIPO,
                                            expanded : false, children:[] 
                                        });

                                        Ext.Object.each(data, function(index, value02){                                            
                                            if ( ( value01.A1720NATUR_00 === value02.A1720NATUR_00 ) &&  ( value01.A1720TIPO_00 === value02.A1720TIPO_00 ) ){                                                
                                                dataRoot.children[a.indexOf(value01.A1720NATUR_00)].children[b.indexOf(value01.A1720TIPO_00)].children.push({
                                                    DESCRIPTION: value02.A1720DESCR, 
                                                    A1720TIPO_00: value01.A1720TIPO_00,
                                                    A1720QTRSA : parseInt(value02.A1720QTRSA), 
                                                    A1720VSALC : parseFloat(value02.A1720VSALC), 
                                                    A1720QTRRF : parseInt(value02.A1720QTRRF), 
                                                    A1720VRFLC: parseFloat(value02.A1720VRFLC), 
                                                    A1720VNTLC : parseFloat(value02.A1720VNTLC), 
                                                    A1720VSARV : parseFloat(value02.A1720VSARV), 
                                                    A1720VRFRV : parseFloat(value02.A1720VRFRV), 
                                                    A1720VNTRV : parseFloat(value02.A1720VNTRV),
                                                    LINK_DETAIL: value02.LINK_DETAIL,//'1'
                                                    LINK_DETAIL2: 'C',
                                                    A1720TIPO  : value02.A1720TIPO,
                                                    A1720STIPO : value02.A1720STIPO,
                                                    leaf: true 
                                                });
                                                // console.log( dataRoot.children[a.indexOf(value.A1720NATUR_00)].children[b.indexOf(value01.A1720TIPO_00)] );
                                            }
                                        });
                                    }else{
                                        dataRoot.children[a.indexOf(value.A1720NATUR_00)].children[b.indexOf(value01.A1720TIPO_00)].A1720QTRSA += parseInt(value01.A1720QTRSA);
                                        dataRoot.children[a.indexOf(value.A1720NATUR_00)].children[b.indexOf(value01.A1720TIPO_00)].A1720VSALC += parseFloat(value01.A1720VSALC);
                                        dataRoot.children[a.indexOf(value.A1720NATUR_00)].children[b.indexOf(value01.A1720TIPO_00)].A1720QTRRF += parseInt(value01.A1720QTRRF);

                                        dataRoot.children[a.indexOf(value.A1720NATUR_00)].children[b.indexOf(value01.A1720TIPO_00)].A1720VRFLC += parseInt(value01.A1720VRFLC);

                                        dataRoot.children[a.indexOf(value.A1720NATUR_00)].children[b.indexOf(value01.A1720TIPO_00)].A1720VNTLC += parseFloat(value01.A1720VNTLC);
                                        dataRoot.children[a.indexOf(value.A1720NATUR_00)].children[b.indexOf(value01.A1720TIPO_00)].A1720VSARV += parseFloat(value01.A1720VSARV);
                                        dataRoot.children[a.indexOf(value.A1720NATUR_00)].children[b.indexOf(value01.A1720TIPO_00)].A1720VRFRV += parseFloat(value01.A1720VRFRV);
                                        dataRoot.children[a.indexOf(value.A1720NATUR_00)].children[b.indexOf(value01.A1720TIPO_00)].A1720VNTRV += parseFloat(value01.A1720VNTRV);                                        
                                    }
                                }
                            });
                        }
                        else{
                            dataRoot.children[a.indexOf(value.A1720NATUR_00)].A1720QTRSA += parseInt(value.A1720QTRSA);
                            dataRoot.children[a.indexOf(value.A1720NATUR_00)].A1720VSALC += parseFloat(value.A1720VSALC);
                            dataRoot.children[a.indexOf(value.A1720NATUR_00)].A1720QTRRF += parseInt(value.A1720QTRRF);                            
                            dataRoot.children[a.indexOf(value.A1720NATUR_00)].A1720VRFLC += parseFloat(value.A1720VRFLC);                            
                            dataRoot.children[a.indexOf(value.A1720NATUR_00)].A1720VNTLC += parseFloat(value.A1720VNTLC);
                            dataRoot.children[a.indexOf(value.A1720NATUR_00)].A1720VSARV += parseFloat(value.A1720VSARV);
                            dataRoot.children[a.indexOf(value.A1720NATUR_00)].A1720VRFRV += parseFloat(value.A1720VRFRV);
                            dataRoot.children[a.indexOf(value.A1720NATUR_00)].A1720VNTRV += parseFloat(value.A1720VNTRV);
                        }
                    });
                    //</editor-fold>

                    //<editor-fold defaultstate="collapsed" desc="gridControlFig">
                    var tree = Ext.create('Ext.tree.Panel',{
                        id: prototype.id+'-gridControlFig', 
                        width: '98%',
                        height:'100%',      
                        border: true,
                        root: dataRoot,
                        reserveScrollbar: false,
                        useArrows: true,
                        rootVisible: false,
                        multiSelect: false,
                        columnLines: true,
                        rowLines: true,
                        columns: {
                            defaults: {
                                menuDisabled: true,
                                sortable: true,
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'treecolumn',
                                    text: 'Description',
                                    align: 'center',
                                    dataIndex: 'DESCRIPTION',
                                    flex: 1,//width: 215
                                    renderer: function(value, metaData, record, rowIndex, colIndex){
                                        switch (record.data.LINK_DETAIL2) {
                                            case 'A': metaData.style = "text-align:left;font-weight:bold;color:#0000FF;"; break;
                                            case 'B': metaData.style = "text-align:left;font-weight:bold;color:#008000;"; break;
                                            case 'C': metaData.style = "text-align:left;"; break;
                                        }
                                        return value;
                                    }
                                },
                                {
                                    text: 'Original Currency',
                                    id: prototype.id+'-gridControlFig_GridCol01',
                                    defaults: {
                                        menuDisabled: true,
                                        sortable: true,
                                        align: 'center'
                                    },
                                    columns:[
                                        {
                                            text: 'Trans Qty <br>Sal.',
                                            dataIndex: 'A1720QTRSA',
                                            width: 85,
                                            align: 'right',
                                            sortable: false,
                                            renderer: function(value, metaData, record, rowIndex, colIndex){
                                                switch (record.data.LINK_DETAIL2) {
                                                    case 'A': metaData.style = "text-align:right;font-weight:bold;color:#0000FF;"; break;
                                                    case 'B': metaData.style = "text-align:right;font-weight:bold;color:#008000;"; break;
                                                    case 'C': metaData.style = "text-align:right;"; break;
                                                }
                                                return Ext.util.Format.number(value, '0,000');
                                            }
                                        },
                                        {
                                            text: 'Sales',
                                            dataIndex: 'A1720VSALC',
                                            width: 100,
                                            renderer:function(value, metaData, record, rowIndex, colIndex,store){                                                   
                                                switch (record.data.LINK_DETAIL2) {
                                                    case 'A': metaData.style = "text-align:right;font-weight:bold;color:#0000FF;"; break;
                                                    case 'B': metaData.style = "text-align:right;font-weight:bold;color:#008000;"; break;
                                                    case 'C': metaData.style = "text-align:right;"; break;
                                                }
                                                return Ext.util.Format.number(value, '0,000.00');
                                            }
                                        },
                                        {
                                            text: '', dataIndex: '', width: 27,
// Opcion NO habilitada para Treasury                                            
//                                            listeners: {
//                                                click: 'gridData_act1_clickHandler'
//                                            },
//                                            renderer: function(value, metaData, record, rowIndex, colIndex,store){
//                                                if(record.data.LINK_DETAIL2 === 'C' ) return '<img src="resources/img/botones/16x16/application_view_detail.png">';
//                                                else return '';
//                                            }
                                        },
                                        {
                                            text: 'Trans Qty <br>Ref.',
                                            dataIndex: 'A1720QTRRF',
                                            width: 85,
                                            sortable: false,
                                            align: 'right',
                                            renderer: function(value, metaData, record, rowIndex, colIndex){
                                                switch (record.data.LINK_DETAIL2) {
                                                    case 'A': metaData.style = "text-align:right;font-weight:bold;color:#0000FF;"; break;
                                                    case 'B': metaData.style = "text-align:right;font-weight:bold;color:#008000;"; break;
                                                    case 'C': metaData.style = "text-align:right;"; break;
                                                }
                                                return Ext.util.Format.number(value, '0,000');
                                            }
                                        },
                                        {
                                            text: 'Refund',
                                            dataIndex: 'A1720VRFLC',
                                            width: 100,
                                            renderer:function(value, metaData, record, rowIndex, colIndex,store){                                                   
                                                switch (record.data.LINK_DETAIL2) {
                                                    case 'A': metaData.style = "text-align:right;font-weight:bold;color:#0000FF;"; break;
                                                    case 'B': metaData.style = "text-align:right;font-weight:bold;color:#008000;"; break;
                                                    case 'C': metaData.style = "text-align:right;"; break;
                                                }
                                                return Ext.util.Format.number(value, '0,000.00');                                               
                                            }
                                        },      
                                        {
                                            text: '', dataIndex: '', width: 27,
// Opcion NO habilitada para Treasury                                            
//                                            listeners: {
//                                                click: 'gridData_act2_clickHandler'
//                                            },
//                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
//                                                if(record.data.LINK_DETAIL2 === 'C' ) return '<img src="resources/img/botones/16x16/application_view_detail.png">';
//                                                else return '';
//                                            }
                                        },
                                        {
                                            text: 'Net',
                                            dataIndex: 'A1720VNTLC',
                                            width: 100,
                                            renderer: function(value, metaData, record, rowIndex, colIndex){
                                                switch (record.data.LINK_DETAIL2) {
                                                    case 'A': metaData.style = "text-align:right;font-weight:bold;color:#0000FF;"; break;
                                                    case 'B': metaData.style = "text-align:right;font-weight:bold;color:#008000;"; break;
                                                    case 'C': metaData.style = "text-align:right;"; break;
                                                }
                                                return Ext.util.Format.number(value, '0,000.00');
                                            }
                                        }
                                    ]
                                },
                                {
                                    text: '', dataIndex: '', width: 40
                                },
                                {
                                    text: 'Converted Currency',
                                    id: prototype.id+'-gridControlFig_GridCol02',
                                    defaults: {
                                        menuDisabled: true,
                                        sortable: true,
                                        align: 'center'
                                    },
                                    columns:[
                                        {
                                            text: 'Sales',
                                            dataIndex: 'A1720VSARV',
                                            width: 100,
                                            renderer: function(value, metaData, record, rowIndex, colIndex){
                                                switch (record.data.LINK_DETAIL2) {
                                                    case 'A': metaData.style = "text-align:right;font-weight:bold;color:#0000FF;"; break;
                                                    case 'B': metaData.style = "text-align:right;font-weight:bold;color:#008000;"; break;
                                                    case 'C': metaData.style = "text-align:right;"; break;
                                                }
                                                return Ext.util.Format.number(value, '0,000.00');
                                            }
                                        },
                                        {
                                            text: 'Refund',
                                            dataIndex: 'A1720VRFRV',
                                            width: 100,
                                            renderer: function(value, metaData, record, rowIndex, colIndex){
                                                switch (record.data.LINK_DETAIL2) {
                                                    case 'A': metaData.style = "text-align:right;font-weight:bold;color:#0000FF;"; break;
                                                    case 'B': metaData.style = "text-align:right;font-weight:bold;color:#008000;"; break;
                                                    case 'C': metaData.style = "text-align:right;"; break;
                                                }
                                                return Ext.util.Format.number(value, '0,000.00');
                                            }
                                        },
                                        {
                                            text: 'Net',
                                            dataIndex: 'A1720VNTRV',
                                            width: 140,
                                            renderer: function(value, metaData, record, rowIndex, colIndex){
                                                switch (record.data.LINK_DETAIL2) {
                                                    case 'A': metaData.style = "text-align:right;font-weight:bold;color:#0000FF;"; break;
                                                    case 'B': metaData.style = "text-align:right;font-weight:bold;color:#008000;"; break;
                                                    case 'C': metaData.style = "text-align:right;"; break;
                                                }
                                                return Ext.util.Format.number(value, '0,000.00');
                                            }
                                        }
                                    ]
                                }
                            ]
                        },
                        dockedItems:{
                            xtype: 'toolbar',
                            dock: 'left',
                            border: false,
                            items:[
                                {
                                    xtype: 'button',
                                    icon: 'resources/img/botones/expanded.png',
                                    tooltip: 'Expand the tree',
                                    enableToggle: true,
                                    toggleHandler: function (button, pressed, eOpts) {
                                        Ext.getCmp(prototype.id+'-gridControlFig').expandAll();
                                    }
                                },
                                {
                                    xtype: 'button',
                                    icon: 'resources/img/botones/collaped.png',
                                    tooltip: 'Collapse the tree',
                                    enableToggle: true,
                                    toggleHandler: function (button, pressed, eOpts) {
                                        Ext.getCmp(prototype.id+'-gridControlFig').collapseAll();
                                    }
                                }
                            ]
                        },
                        viewConfig: {
                            stripeRows: true,
                            enableTextSelection: true,
                            markDirty: false,
                            getRowClass: function(record, rowIndex, rowParams, store) {
                                if ( rowIndex % 2 == 0 ) return 'rowA';
                            }
                        }
                    });
                    //</editor-fold>
// sorters desde la base de datos VH
//                    var store = Ext.getCmp(prototype.id+'-gridControlFig').getStore();
//                    store.sorters.add(new Ext.util.Sorter({
//                        property : 'DESCRIPTION',
//                        direction: 'DESC'
//                    }));

                    if (data.length > 0) {
                        var file = data[0];
                        Ext.getCmp(prototype.id+'-gridControlFig_GridCol01').setText(title);
                        Ext.getCmp(prototype.id+'-gridControlFig_GridCol02').setText('Converted Currency '+ file.A1720MDARV);
                    } else {
                        Ext.getCmp(prototype.id+'-gridControlFig').getStore().removeAll();
                    }
                    contenedor.add(tree);
                    contenedor.updateLayout();
                } else global.Msg({ msg: res.sesion });
            },
            failure: function(response, opts) {
                Ext.getCmp(prototype.id+'-tabControlfiguresDetail').unmask();
//                console.log('server-side failure with status code '+response.status);
            }
        });
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="getSQP00133">
    getSQP00133: function(beanDet02, title) {
        var contenedor2 = Ext.getCmp(prototype.id+'-boxDatailOriginal');
        contenedor2.removeAll();
        Ext.Ajax.request({
            url: prototype.url+'/getSQP00133',
            method: 'POST',
            timeout: 60000000,
            params: { beanString: JSON.stringify(beanDet02) },
            beforerequest: Ext.getCmp(prototype.id+'-tabControlfiguresDetail').mask('Loading...'),
            success: function(response, opts){
                Ext.getCmp(prototype.id+'-tabControlfiguresDetail').unmask();
                var res = Ext.JSON.decode(response.responseText);
                if (res.success) {
                    var data = res.RwDataOriginal;
                    //<editor-fold defaultstate="collapsed" desc="dataRoot">
                    var a= [];
                    var dataRoot = {text: '.', expanded: false, children:[]};                    
                    Ext.Object.each(data, function(index, value){
                        if ( a.indexOf(value.A1875NATUR_00) < 0 )
                        {
                            a.push(value.A1875NATUR_00);
                            dataRoot.children.push({
                                DESCRIPTION: value.A1875NATUR_00, 
                                A1875QTRSA : parseInt(value.A1875QTRSA), 
                                A1875VSALC : parseFloat(value.A1875VSALC), 
                                A1875QTRRF : parseInt(value.A1875QTRRF), 
                                A1875VRFLC: parseFloat(value.A1875VRFLC), 
                                A1875VNTLC : parseFloat(value.A1875VNTLC),                                                                 
                                A1875VSARV : parseFloat(value.A1875VSARV), 
                                A1875VRFRV : parseFloat(value.A1875VRFRV), 
                                A1875VNTRV : parseFloat(value.A1875VNTRV), 
                                LINK_DETAIL: '',
                                LINK_DETAIL2: 'A',
                                A1875TIPO: value.A1875TIPO,
                                A1875STIPO: value.A1875STIPO,
                                expanded : false, children:[] });
                            var b = [];
                            Ext.Object.each(data, function(index, value01){
                                if ( value.A1875NATUR_00 === value01.A1875NATUR_00 ){
                                    if ( b.indexOf(value01.A1875TIPO_00) < 0 ){
                                        b.push(value01.A1875TIPO_00);
                                        dataRoot.children[a.indexOf(value.A1875NATUR_00)].children.push({
                                            DESCRIPTION: value01.A1875TIPO_00, 
                                            A1875QTRSA : parseInt(value01.A1875QTRSA), 
                                            A1875VSALC : parseFloat(value01.A1875VSALC), 
                                            A1875QTRRF : parseInt(value01.A1875QTRRF), 
                                            A1875VRFLC: parseFloat(value01.A1875VRFLC), 
                                            A1875VNTLC : parseFloat(value01.A1875VNTLC), 
                                            A1875VSARV : parseFloat(value01.A1875VSARV), 
                                            A1875VRFRV : parseFloat(value01.A1875VRFRV), 
                                            A1875VNTRV : parseFloat(value01.A1875VNTRV), 
                                            LINK_DETAIL: '',
                                            LINK_DETAIL2: 'B',
                                            A1875TIPO: value01.A1875TIPO,
                                            A1875STIPO: value01.A1875STIPO,
                                            expanded : false, children:[] 
                                        });

                                        Ext.Object.each(data, function(index, value02){
                                            if ( ( value.A1875NATUR_00 === value01.A1875NATUR_00 ) &&  ( value01.A1875TIPO_00 === value02.A1875TIPO_00 ) ){
                                                dataRoot.children[a.indexOf(value.A1875NATUR_00)].children[b.indexOf(value01.A1875TIPO_00)].children.push({
                                                    DESCRIPTION: value02.A1875DESCR, 
                                                    A1875QTRSA : parseInt(value02.A1875QTRSA), 
                                                    A1875VSALC : parseFloat(value02.A1875VSALC), 
                                                    A1875QTRRF : parseInt(value02.A1875QTRRF), 
                                                    A1875VRFLC: parseFloat(value02.A1875VRFLC), 
                                                    A1875VNTLC : parseFloat(value02.A1875VNTLC), 
                                                    A1875VSARV : parseFloat(value02.A1875VSARV), 
                                                    A1875VRFRV : parseFloat(value02.A1875VRFRV), 
                                                    A1875VNTRV : parseFloat(value02.A1875VNTRV),
                                                    LINK_DETAIL: value02.LINK_DETAIL,
                                                    LINK_DETAIL2: 'C',
                                                    A1875TIPO  : value02.A1875TIPO,
                                                    A1875STIPO : value02.A1875STIPO,
                                                    leaf: true 
                                                });
                                                // console.log( dataRoot.children[a.indexOf(value.A1875NATUR_00)].children[b.indexOf(value01.A1875TIPO_00)] );
                                            }
                                        });
                                    }else{
                                        dataRoot.children[a.indexOf(value.A1875NATUR_00)].children[b.indexOf(value01.A1875TIPO_00)].A1875QTRSA += parseInt(value01.A1875QTRSA);
                                        dataRoot.children[a.indexOf(value.A1875NATUR_00)].children[b.indexOf(value01.A1875TIPO_00)].A1875VSALC += parseFloat(value01.A1875VSALC);
                                        dataRoot.children[a.indexOf(value.A1875NATUR_00)].children[b.indexOf(value01.A1875TIPO_00)].A1875QTRRF += parseInt(value01.A1875QTRRF);
                                        
                                        dataRoot.children[a.indexOf(value.A1875NATUR_00)].children[b.indexOf(value01.A1875TIPO_00)].A1875VRFLC += parseInt(value01.A1875VRFLC);
                                        
                                        dataRoot.children[a.indexOf(value.A1875NATUR_00)].children[b.indexOf(value01.A1875TIPO_00)].A1875VNTLC += parseFloat(value01.A1875VNTLC);
                                        dataRoot.children[a.indexOf(value.A1875NATUR_00)].children[b.indexOf(value01.A1875TIPO_00)].A1875VSARV += parseFloat(value01.A1875VSARV);
                                        dataRoot.children[a.indexOf(value.A1875NATUR_00)].children[b.indexOf(value01.A1875TIPO_00)].A1875VRFRV += parseFloat(value01.A1875VRFRV);
                                        dataRoot.children[a.indexOf(value.A1875NATUR_00)].children[b.indexOf(value01.A1875TIPO_00)].A1875VNTRV += parseFloat(value01.A1875VNTRV);                                        
                                    }
                                }
                            });
                        }
                        else{
                            dataRoot.children[a.indexOf(value.A1875NATUR_00)].A1875QTRSA += parseInt(value.A1875QTRSA);
                            dataRoot.children[a.indexOf(value.A1875NATUR_00)].A1875VSALC += parseFloat(value.A1875VSALC);
                            dataRoot.children[a.indexOf(value.A1875NATUR_00)].A1875QTRRF += parseInt(value.A1875QTRRF);                            
                            dataRoot.children[a.indexOf(value.A1875NATUR_00)].A1875VRFLC += parseFloat(value.A1875VRFLC);                            
                            dataRoot.children[a.indexOf(value.A1875NATUR_00)].A1875VNTLC += parseFloat(value.A1875VNTLC);
                            dataRoot.children[a.indexOf(value.A1875NATUR_00)].A1875VSARV += parseFloat(value.A1875VSARV);
                            dataRoot.children[a.indexOf(value.A1875NATUR_00)].A1875VRFRV += parseFloat(value.A1875VRFRV);
                            dataRoot.children[a.indexOf(value.A1875NATUR_00)].A1875VNTRV += parseFloat(value.A1875VNTRV);
                        }
                    });
                    //</editor-fold>
                    
                    //<editor-fold defaultstate="collapsed" desc="gridDataOriginal">
                    var tree = Ext.create('Ext.tree.Panel',{
                        id: prototype.id+'-gridDataOriginal',    
                        width: '98%',
                        height:'100%',      
                        border: true,
                        root: dataRoot,
                        reserveScrollbar: false,
                        useArrows: true,
                        rootVisible: false,
                        multiSelect: false,
                        columnLines: true,
                        rowLines: true,
                        columns: {
                            defaults: {
                                menuDisabled: true,
                                sortable: true,
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'treecolumn',
                                    text: 'Description',
                                    align: 'center',
                                    dataIndex: 'DESCRIPTION',
                                    flex: 1,//width: 215
                                    renderer: function(value, metaData, record, rowIndex, colIndex){
                                        switch (record.data.LINK_DETAIL2) {
                                            case 'A': metaData.style = "text-align:left;font-weight:bold;color:#0000FF;"; break;
                                            case 'B': metaData.style = "text-align:left;font-weight:bold;color:#008000;"; break;
                                            case 'C': metaData.style = "text-align:left;"; break;
                                        }
                                        return value;
                                    }
                                },
                                {
                                    text: 'Original Currency',
                                    id: prototype.id+'-gridDataOriginal_GridCol01',
                                    defaults: {
                                        menuDisabled: true,
                                        sortable: true,
                                        align: 'center'
                                    },
                                    columns:[
                                        {
                                            text: 'Trans Qty <br>Sal.',
                                            dataIndex: 'A1875QTRSA',
                                            width: 85,
                                            align: 'right',
                                            sortable: false,
                                            renderer: function(value, metaData, record, rowIndex, colIndex){
                                                switch (record.data.LINK_DETAIL2) {
                                                    case 'A': metaData.style = "text-align:right;font-weight:bold;color:#0000FF;"; break;
                                                    case 'B': metaData.style = "text-align:right;font-weight:bold;color:#008000;"; break;
                                                    case 'C': metaData.style = "text-align:right;"; break;
                                                }
                                                return Ext.util.Format.number(value, '0,000');
                                            }
                                        },
                                        {
                                            text: 'Sales',
                                            dataIndex: 'A1875VSALC',
                                            width: 127,
                                            renderer:function(value, metaData, record, rowIndex, colIndex,store){
                                                switch (record.data.LINK_DETAIL2) {
                                                    case 'A': metaData.style = "text-align:right;font-weight:bold;color:#0000FF;"; break;
                                                    case 'B': metaData.style = "text-align:right;font-weight:bold;color:#008000;"; break;
                                                    case 'C': metaData.style = "text-align:right;"; break;
                                                }
                                                return Ext.util.Format.number(value, '0,000.00');                                                
                                            }
                                        },
                                        {
                                            text: 'Trans Qty <br>Ref.',
                                            dataIndex: 'A1875QTRRF',
                                            width: 85,
                                            sortable: false,
                                            align: 'right',
                                            renderer: function(value, metaData, record, rowIndex, colIndex){
                                                switch (record.data.LINK_DETAIL2) {
                                                    case 'A': metaData.style = "text-align:right;font-weight:bold;color:#0000FF;"; break;
                                                    case 'B': metaData.style = "text-align:right;font-weight:bold;color:#008000;"; break;
                                                    case 'C': metaData.style = "text-align:right;"; break;
                                                }
                                                return Ext.util.Format.number(value, '0,000');
                                            }
                                        },
                                        {                                        
                                            text: 'Refund',
                                            dataIndex: 'A1875VRFLC',
                                            width: 127,
                                            renderer:function(value, metaData, record, rowIndex, colIndex,store){
                                                switch (record.data.LINK_DETAIL2) {
                                                    case 'A': metaData.style = "text-align:right;font-weight:bold;color:#0000FF;"; break;
                                                    case 'B': metaData.style = "text-align:right;font-weight:bold;color:#008000;"; break;
                                                    case 'C': metaData.style = "text-align:right;"; break;
                                                }
                                                return Ext.util.Format.number(value, '0,000.00');                                               
                                            }
                                        },
                                        {
                                            text: 'Net',
                                            dataIndex: 'A1875VNTLC',
                                            width: 100,
                                            renderer: function(value, metaData, record, rowIndex, colIndex){
                                                switch (record.data.LINK_DETAIL2) {
                                                    case 'A': metaData.style = "text-align:right;font-weight:bold;color:#0000FF;"; break;
                                                    case 'B': metaData.style = "text-align:right;font-weight:bold;color:#008000;"; break;
                                                    case 'C': metaData.style = "text-align:right;"; break;
                                                }
                                                return Ext.util.Format.number(value, '0,000.00');
                                            }
                                        }
                                    ]
                                },
                                {
                                    text: '', dataIndex: '', width: 40
                                },
                                {
                                    text: 'Converted Currency',
                                    id: prototype.id+'-gridDataOriginal_GridCol02',
                                    defaults: {
                                        menuDisabled: true,
                                        sortable: true,
                                        align: 'center'
                                    },
                                    columns:[
                                        {
                                            text: 'Sales',
                                            dataIndex: 'A1875VSARV',
                                            width: 100,
                                            renderer: function(value, metaData, record, rowIndex, colIndex){
                                                switch (record.data.LINK_DETAIL2) {
                                                    case 'A': metaData.style = "text-align:right;font-weight:bold;color:#0000FF;"; break;
                                                    case 'B': metaData.style = "text-align:right;font-weight:bold;color:#008000;"; break;
                                                    case 'C': metaData.style = "text-align:right;"; break;
                                                }
                                                return Ext.util.Format.number(value, '0,000.00');
                                            }
                                        },
                                        {
                                            text: 'Refund',
                                            dataIndex: 'A1875VRFRV',
                                            width: 100,
                                            renderer: function(value, metaData, record, rowIndex, colIndex){
                                                switch (record.data.LINK_DETAIL2) {
                                                    case 'A': metaData.style = "text-align:right;font-weight:bold;color:#0000FF;"; break;
                                                    case 'B': metaData.style = "text-align:right;font-weight:bold;color:#008000;"; break;
                                                    case 'C': metaData.style = "text-align:right;"; break;
                                                }
                                                return Ext.util.Format.number(value, '0,000.00');
                                            }
                                        },
                                        {
                                            text: 'Net',
                                            dataIndex: 'A1875VNTRV',
                                            width: 140,
                                            renderer: function(value, metaData, record, rowIndex, colIndex){
                                                switch (record.data.LINK_DETAIL2) {
                                                    case 'A': metaData.style = "text-align:right;font-weight:bold;color:#0000FF;"; break;
                                                    case 'B': metaData.style = "text-align:right;font-weight:bold;color:#008000;"; break;
                                                    case 'C': metaData.style = "text-align:right;"; break;
                                                }
                                                return Ext.util.Format.number(value, '0,000.00');
                                            }
                                        }
                                    ]
                                }
                            ]
                        },
                        dockedItems:{
                            xtype: 'toolbar',
                            dock: 'left',
                            border: false,
                            items:[
                                {
                                    xtype: 'button',
                                    icon: 'resources/img/botones/expanded.png',
                                    tooltip: 'Expand the tree',
                                    enableToggle: true,
                                    toggleHandler: function (button, pressed, eOpts) {
                                        Ext.getCmp(prototype.id+'-gridDataOriginal').expandAll();
                                    }
                                },
                                {
                                    xtype: 'button',
                                    icon: 'resources/img/botones/collaped.png',
                                    tooltip: 'Collapse the tree',
                                    enableToggle: true,
                                    toggleHandler: function (button, pressed, eOpts) {
                                        Ext.getCmp(prototype.id+'-gridDataOriginal').collapseAll();
                                    }
                                }
                            ]
                        },
                        viewConfig: {
                            stripeRows: true,
                            enableTextSelection: true,
                            markDirty: false,
                            getRowClass: function(record, rowIndex, rowParams, store) {
                                if ( rowIndex % 2 == 0 ) return 'rowA';
                            }
                        }
                    });
                    //</editor-fold>
// sorters desde la base de datos VH                    
//                    var store = Ext.getCmp(prototype.id+'-gridDataOriginal').getStore();
//                    store.sorters.add(new Ext.util.Sorter({
//                        property : 'DESCRIPTION',
//                        direction: 'DESC'
//                    }));
//                    
                    if (data.length > 0) {
                        var file = data[0];
//                        Ext.getCmp(prototype.id+'-gridDataOriginal_GridCol01').setText(title);
                        Ext.getCmp(prototype.id+'-gridDataOriginal_GridCol02').setText('Converted Currency '+ file.A1875MDARV);
                    } else {
                        Ext.getCmp(prototype.id+'-gridDataOriginal').getStore().removeAll();
                    }
                    contenedor2.add(tree);
                    contenedor2.updateLayout();
                } else global.Msg({ msg: res.sesion });
            },
            failure: function(response, opts) {
                Ext.getCmp(prototype.id+'-tabControlfiguresDetail').unmask();
//                console.log('server-side failure with status code '+response.status);
            }
        });
    },
    //</editor-fold>
    
    exportExcel: function(_path) {
        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: 'Download Excel ?',
            buttons: Ext.MessageBox.OKCANCEL,
            scope: this,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function(btn) {
                if (btn === 'ok') {
                    global.getFile(prototype.url + _path);
                }
            }
        });
    },
    
    // SALE
    gridData_act1_clickHandler_01: function(data) {
        // Array Groups: A1530
        var A1530GROUPS = "";
        var rows = {};
        for (var i = 0; i < this.lstControlfiguresRep.length; i++) {
            rows = this.lstControlfiguresRep[i];
            if ( i===0 ) A1530GROUPS = rows.A1530GRUPO;
            else A1530GROUPS = A1530GROUPS +'|'+ rows.A1530GRUPO;
        }
        var txtGroupSelected = win.getValue('txtGroupSelected');
        if (txtGroupSelected !== '') {
            A1530GROUPS = txtGroupSelected;
        }
        // Add Param	
	data.A1530GROUPS = A1530GROUPS;
	data.TRANS = "S";
	data.CCUST = "139";	
        
        // Title Windonw
        var dataEntry = Ext.create('Ext.Praxis.view.sales.ControlFiguresForm.DataEntry',{
            id: 'DataEntryControlFiguresForm'
        });
        
        var controller = dataEntry.getController();
        controller.gridA1720 = data;
        
        dataEntry.show();
    },
    gridData_act1_clickHandler_02: function(data) {
        // Array Groups: A1530
        var A1530GROUPS="";
        var rows = {};
        for(var i=0; i<this.lstControlfiguresRep.length; i++){
            rows = this.lstControlfiguresRep[i];
            if ( i===0 ) A1530GROUPS = rows.A1530GRUPO;
            else A1530GROUPS = A1530GROUPS +'|'+ rows.A1530GRUPO;				
        }
        if(win.getValue('txtGroupSelected') !== "" ){
            A1530GROUPS = win.getValue('txtGroupSelected');
        }
        var dataEntry = Ext.create('Ext.Praxis.view.sales.ControlFiguresForm.DataEntryDetailAdms',{
            id: 'DataEntryDetailAdmsControlFiguresForm'
        });
        data.A1530GROUPS = A1530GROUPS;
        data.CCUST = "139";
        var controller = dataEntry.getController();
        controller.gridA1720 = data;
        
        dataEntry.show();
    },
    limpiar_grid: function() {
        Ext.getCmp(prototype.id+'-gridControlLoadfigRep').getStore().removeAll();        
        Ext.getCmp(prototype.id+'-boxDatail').removeAll();
        Ext.getCmp(prototype.id+'-boxDatailOriginal').removeAll();        
    },
    txtClear_imput: function () {
        win.setValue('txtTypeOfDate_00', '');
        win.setValue('IN_A1530AGENT', '');
        win.setValue('IN_A1530PSVTA', '');
        win.setValue('IN_A1530SFUEN', '');
        win.setValue('txtA1530CSABR', '');
        win.setValue('txtA1530GRUPO', '');
    },
    execSearchGroupDet_02: function (data, title) {
        this.beanDet02.IN_A1875CCUST = data.A1530CCUST;
        this.beanDet02.IN_A1875GRUPO = data.A1530GRUPO;
        this.getSQP00133(this.beanDet02, title);
    },
    
    onUpperValue: function(field, newValue, oldValue){
        field.setValue(newValue.toUpperCase());
    },
    onTextKeypress: function( obj , e , eOpts){
        if ( e.getKey() === e.ENTER ){
            this.imgSearch_clickHandler();
        }
    }
});
