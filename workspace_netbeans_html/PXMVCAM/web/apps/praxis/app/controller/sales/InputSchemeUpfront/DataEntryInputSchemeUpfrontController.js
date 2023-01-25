Ext.define('Ext.Praxis.controller.sales.InputSchemeUpfront.DataEntryInputSchemeUpfrontController',{
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataEntryInputSchemeUpfrontController',
    // <editor-fold defaultstate="collapsed" desc="Variables Globales">
    actionCode: '',
    bean: {},
    TM: '',
    lstFUNCTION: new Array(),
    lstFUNCTIONA: new Array(),
    lstPARAMTG: new Array(),
    lstMONEDA: new Array(),
    searchParams: {},
    beanCOMPONENT: {},
    beanRESTRICTION: {},
    CHANGEC: "I",
    XSC: true,
    XCN: 0,
    TBFR: false,
    TBTW: false,
    TBTR: false,
    LLABEL: false,
    EDIT_AIRLI: '',
    EDIT_CODAC: '',
    EDIT_INDAC: '',
    EDIT_VRSAC: '',
    TYPE_MODULE: '',
    DATA_PARANT_A2: new Array(),
    DATA_PARANT_B1: new Array(),
    DATA_PARANT_B2: new Array(),
    lstMETOD: new Array(),
    lstTDATA: new Array(),
    lstTABLEAXX: new Array(),
    lstTABLEAX: new Array(),
    beanSQP01090: {},
    me: '',
    beanSQP01597: {},
    beanSQP01723: {},
    TRIMESTRAL: new Ext.data.SimpleStore({
        fields: ['code', 'name'],
        data: [
            ["1", "1ST QUARTER"], ["2", "2ND QUARTER"], ["3", "3RD QUARTER"], ["4", "4TH QUARTER"]
        ]
    }),
    BIMESTRAL: new Ext.data.SimpleStore({
        fields: ['code', 'name'],
        data: [
            ["1", "1ST BIMESTER"], ["2", "2ND BIMESTER"], ["3", "3RD BIMESTER"], ["4", "4TH BIMESTER"], ["5", "5TO BIMESTER"], ["6", "6TO BIMESTER"]
        ]
    }),
    SEMESTRE: new Ext.data.SimpleStore({
        fields: ['code', 'name'],
        data: [
            ["1", "1ST SEMETRE"], ["2", "2ND SEMETRE"]
        ]
    }),
    MENSUAL: new Ext.data.SimpleStore({
        fields: ['code', 'name'],
        data: [
            ["1", "Jan"], ["2", "Feb"], ["3", "Mar"], ["4", "Apr"], ["5", "May"], ["6", "Jun"],
            ["7", "Jul"], ["8", "Aug"], ["9", "Sep"], ["10", "Oct"], ["11", "Nov"], ["12", "Dec"]
        ]
    }),
    FF: 'BSP',
    // </editor-fold>
    init: function(view) {
        me = this;
        this.p = this.view.params;
        this.actionCode = this.p.actionCode;
        this.bean = this.p.bean;
        this.TM = this.p.TM;
        this.lstFUNCTION = this.p.lstFUNCTION;
        this.lstFUNCTIONA = this.p.lstFUNCTIONA;
        this.lstPARAMTG = this.p.lstPARAMTG;
        this.lstMONEDA = this.p.lstMONEDA;
    },
    afterRender: function(){
        this.init2();
    },
    init2: function() {
        this.clearLoads();
        this.initMainTab();
        var HC = this.actionCode==='U'?135:0;
        this.setData();
        //
        this.limpiarData();
        switch( this.actionCode ){
            case 'I':
                this.getHiddenTab(true);
                this.setHideBTN(true);
                this.setBlockCMP(true);
                Ext.getCmp(prototype.id+'-textA1155VRSAC').disable(true);
                Ext.getCmp(prototype.id+'-btn2').enable(true);
                Ext.getCmp(prototype.id+'-btn3').disable(true);
                Ext.getCmp(prototype.id+'-TabMaster').items.items[2].tab.disable(true);
                Ext.getCmp(prototype.id+'-TabMaster').items.items[3].tab.disable(true);
                this.setValue('cmbA1155FESTA', 'R');
                Ext.getCmp(prototype.id+'-cmbA1155FESTA').disable(true);
                break;
            case 'U':
                this.getHiddenTab(true);
                this.setHideBTN(true);
                this.setBlockCMP(true);
                Ext.getCmp(prototype.id+'-textA1155VRSAC').disable(true);
                Ext.getCmp(prototype.id+'-btn2').enable(true);
                Ext.getCmp(prototype.id+'-btn3').enable(true);
                Ext.getCmp(prototype.id+'-TabMaster').items.items[2].tab.enable(true);
                Ext.getCmp(prototype.id+'-canvas_console').show();
                
                Ext.getCmp(prototype.id+'-COLUMN_GRID_PRO_SEL').show();
                Ext.getCmp(prototype.id+'-COLUMN_GRID_PRO_EDT').show();
                
                Ext.getCmp(prototype.id+'-TabMaster').items.items[3].tab.enable(true);
                Ext.getCmp(prototype.id+'-boxAuxiliary3').enable(true);
                Ext.getCmp(prototype.id+'-boxAuxiliary3').show();
                Ext.getCmp(prototype.id+'-boxAuxiliary3').setHeight(160);
                
                Ext.getCmp(prototype.id+'-COLUMN_GRID_AX_DEL').show();
                Ext.getCmp(prototype.id+'-COLUMN_GRID_AX_EDT').show();
                Ext.getCmp(prototype.id+'-TabMaster').items.items[1].tab.hide();
                Ext.getCmp(prototype.id+'-cmbA1155FESTA').enable(true);
                break;
        }
        Ext.getCmp(prototype.id+'-cmbDateFromYear').bindStore(win.getStoreYear(false));
        this.setValue('cmbDateFromYear', new Date().getFullYear());
    },
    
    // <editor-fold defaultstate="collapsed" desc="ChangeEvent">
    onCMPAChange: function (cmp, newValue) {
//        cmp.setValue(newValue.toUpperCase());
        this.setChangeStatus(1);
        var selectedIndex = Ext.getCmp(prototype.id+'-CMPA').getStore().indexOf(Ext.getCmp(prototype.id+'-CMPA').getSelectedRecord());
        if(selectedIndex!==-1){//linea 1210
            this.setClearComponent();
            this.DATA_PARANT_A2 = new Array();
            var selectedItem = this.getSelectedItemFUNCTION(newValue);
            this.DATA_PARANT_A2=this.getParamt(selectedItem.idpadre,'2');
            this.setValue('CMPB', null);
            this.getEvent();
        }
//        cmp.setValue(newValue.toUpperCase());
    },
    onCMPCChange: function (cmp, newValue) {
        cmp.setValue(newValue.toUpperCase());
        this.setChangeStatus(3);
        var selectedIndex = Ext.getCmp(prototype.id+'-CMPC').getStore().indexOf(Ext.getCmp(prototype.id+'-CMPC').getSelectedRecord());
        if(selectedIndex!==-1){//linea 1210
            this.DATA_PARANT_B1 = new Array();
            this.DATA_PARANT_B2 = new Array();
            this.setValue('CMPF', null);
            var selectedItem = this.getSelectedItemFUNCTION(this.getValue('CMPC'));
            this.DATA_PARANT_B1=this.getParamt(selectedItem.data,'1');
            var data = new Array();
            this.DATA_PARANT_B1.forEach(function callback(currentValue, index, array) {
                data.push([currentValue.data, currentValue.label]);
            });
            var store = Ext.create('Ext.data.ArrayStore', {
                storeId: 'DATA_PARANT_B1', autoLoad: true, data: data, fields: ['code', 'name']
            });
            Ext.getCmp(prototype.id+'-CMPE').bindStore(store);
            this.setValue('CMPE', null);
            this.getEvent();
        }
    },
    // <editor-fold defaultstate="collapsed" desc="setChangeEnabled">
    setChangeEnabled: function (cmp, newValue) {
        switch (newValue) {
            case '01':
                this.setDisableCMPTB('10000');
                break;
            case '02':
                this.setDisableCMPTB('11000');
                break;
            case '03':
                this.setDisableCMPTB('10100');
                break;
            case '04':
                this.setDisableCMPTB('10110');
                break;
            case '05':
                this.setDisableCMPTB('00010');
                break;
            case '06':
                this.setDisableCMPTB('11110');
                break;
            case '07':
                this.setDisableCMPTB('11110');
                break;
            case '08':
                this.setDisableCMPTB('00110');
                break;
            case '09':
                this.setDisableCMPTB('00001');
                break;
            case '10':
                this.setDisableCMPTB('10000');
                break;
        }
    },
    // </editor-fold>
    ChangeTypeForma: function (cmp, newValue) {
        if (newValue==='M') Ext.getCmp(prototype.id+'-txtCodigoForma').hide();
        else Ext.getCmp(prototype.id+'-txtCodigoForma').show();
    },
    ChangeTypeCalc: function (cmp, newValue) {
        switch (newValue) {
            case 'C':
                Ext.getCmp(prototype.id+'-cmbForma').hide();
                Ext.getCmp(prototype.id+'-txtCodigoForma').hide();
                Ext.getCmp(prototype.id+'-lbl_country').hide();
                Ext.getCmp(prototype.id+'-cmbPais').hide();
                Ext.getCmp(prototype.id+'-lbl_SOURCE').hide();
                Ext.getCmp(prototype.id+'-panel_SOURCE').hide();
                break;
            case 'L':
                Ext.getCmp(prototype.id+'-cmbForma').show();
                if (this.getValue('cmbForma')==='M') Ext.getCmp(prototype.id+'-txtCodigoForma').hide();
                else Ext.getCmp(prototype.id+'-txtCodigoForma').show();
                Ext.getCmp(prototype.id+'-lbl_country').show();
                Ext.getCmp(prototype.id+'-cmbPais').show();
                Ext.getCmp(prototype.id+'-lbl_SOURCE').show();
                Ext.getCmp(prototype.id+'-panel_SOURCE').show();
                break;
            case 'S':
                Ext.getCmp(prototype.id+'-cmbForma').hide();
                Ext.getCmp(prototype.id+'-txtCodigoForma').hide();
                Ext.getCmp(prototype.id+'-lbl_country').show();
                Ext.getCmp(prototype.id+'-cmbPais').show();
                Ext.getCmp(prototype.id+'-lbl_SOURCE').show();
                Ext.getCmp(prototype.id+'-panel_SOURCE').show();
                break;
        }
    },
    setChangeDate: function(cmp, value) {
        if (value) {
            this.setValue('txtA1155FFIN', '');
            Ext.getCmp(prototype.id+'-txtA1155FFIN').disable(true);
        } else {
            Ext.getCmp(prototype.id+'-txtA1155FFIN').enable(true);
            this.focus('txtA1155FFIN');
            
        }
    },
    getChangeTabLabel: function(tab, x) {
        if (this.p.actionCode === 'I' || this.p.actionCode === 'U') {
            var tabPanel = Ext.getCmp(prototype.id+'-TabMasterLabel');
            var activeTab = tabPanel.getActiveTab();
            var activeTabIndex = tabPanel.items.indexOf(activeTab);
            switch (activeTabIndex) {
                case 0:
                    
                    break;
                case 1:
                    if (!this.LLABEL) {
                        this.LLABEL = true;
                        this.getListLabel();
                    }
                    break;
            }
        }
    },
    getChangeTab: function(a, b) {
        var tabPanel = Ext.getCmp(prototype.id+'-TabMaster');
        var activeTab = tabPanel.getActiveTab();
        var activeTabIndex = tabPanel.items.indexOf(activeTab);
        this.setLoads(activeTabIndex);
    },
    // </editor-fold>
    
    // <editor-fold defaultstate="collapsed" desc="KeypressEvent">
    onCMPAKeypress: function( obj , e , eOpts){// 350
        this.setChangeStatus(1);
        if ( e.getKey() === e.ENTER || e.getKey() === e.TAB){
            this.getEvent();
        }
    },
    onCMPBKeypress: function( obj , e , eOpts){// 350
        this.setChangeStatus(2);
        if ( e.getKey() === e.ENTER || e.getKey() === e.TAB){
            this.getEvent();
        }
    },
    onCMPCKeypress: function( obj , e , eOpts){// 350
        console.log(obj);
        console.log(e);
        console.log(eOpts);
//        this.setChangeStatus(3);
        if ( e.getKey() === e.ENTER || e.getKey() === e.TAB){
//            this.validaCampoSTEP(e,3);
        }
    },
    // </editor-fold>
    
    // <editor-fold defaultstate="collapsed" desc="Info">
    setChangeDataRowLabel: function(grid, rowIndex, colIndex) {
        var store = grid.getStore();
        var data = store.getAt(rowIndex).data;
        this.winDataEntryRegisterLabel('U', data);
    },
    winDataEntryRegisterLabel: function(action, data) {
        action = action === null || action === undefined ? 'U' : action;
        data = data === null || data === undefined ? {} : data;
        Ext.create('Ext.Praxis.view.sales.InputSchemeUpfrontForm.DataEntryRegisterLabel', {
            id: 'DataEntryRegisterLabelInputSchemeUpfrontForm',
            params: {
                actionCode: action,
                bean: this.bean,
                beanLabel: data
            }
        }).show();
    },
    displaySearchCodeIATAPopup: function(grid, rowIndex, colIndex) {
        if(this.bean.A1155CODAC ===''){
            global.Msg( {msg: 'Register Information Agreement'} );
            return false;
        }
        this.winDataEntryCodeIATA('I');
    },
    winDataEntryCodeIATA: function(action, data) {
        action = action === null || action === undefined ? 'U' : action;
        data = data === null || data === undefined ? {} : data;
        Ext.create('Ext.Praxis.view.sales.InputSchemeUpfrontForm.DataEntryCodeIATA', {
            id: 'DataEntryCodeIATAInputSchemeUpfrontForm',
            params: {
                actionCode: action,
                TM: this.TM,
                bean: this.bean
            }
        }).show();
    },
    onDeltClick: function(column, e, row, column, x, rowData) {
        var be = x.record.data;
        var LIATA = {};
        LIATA.VP_ACTION = 'D';
        LIATA.VP_AIRLINE='139';
        LIATA.VP_IATA=be.IATA;
        LIATA.VP_INDAC=this.bean.A1155INDAC;
        LIATA.VP_CODE=this.bean.A1155CODAC;
        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: 'Are you sure to delete?',
            buttons: Ext.MessageBox.OKCANCEL,
            scope: this,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function(btn) {
                if (btn === 'ok') {
                    this.setGROUPCODE(LIATA);
                }
            }
        });
    },
    setDeleteDataRowTable: function(column, e, row, column, x, rowData) {
        var beanOption = x.record.data;
        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: 'Are you sure to delete?',
            buttons: Ext.MessageBox.OKCANCEL,
            scope: this,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function(btn) {
                if (btn === 'ok') {
                    beanOption.VP_ACTION = 'D';
                    this.setSQP01090(beanOption);
                }
            }
        });
    },
    setDeleteDataRowTableAll: function(column, e, row, column, x, rowData) {
        var beanOption = {};
        beanOption.A1172AIRLI=this.bean.A1155AIRLI;
	beanOption.A1172CODAC=this.bean.A1155CODAC;
	beanOption.A1172INDAC=this.bean.A1155INDAC;
	beanOption.A1172VRSAC=this.bean.A1155VRSAC;
	beanOption.A1172VALOR='0';
	beanOption.A1172PORCE='0';
        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: 'Are you sure to delete all records?',
            buttons: Ext.MessageBox.OKCANCEL,
            scope: this,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function(btn) {
                if (btn === 'ok') {
                    beanOption.VP_ACTION = 'X';
                    this.setSQP01090(beanOption);
                }
            }
        });
    },
    setSQP01090: function(beanOption) {
        Ext.Ajax.request({
            url: prototype.url+'/setSQP01090',
            method: 'POST',
            timeout: 60000000,
            params: beanOption,
            beforerequest: Ext.getCmp(prototype.id + '-gridAuxiliaryTable').mask('Loading...'),
            success: function(response, options){
                var res = Ext.JSON.decode(response.responseText);
                if (res.success) {
                    me.CHANGEC='I';
                    var lstArray = res.lstResponse;
                    var objSQP01090 = lstArray[0];
                    global.Msg({ msg: objSQP01090.OU_MESSAGE });
                    if(objSQP01090.OU_SQLCODE==='0'){
                        me.getResetData();
                        me.setClearAuxiliaryTable();
                    }
                } else global.Msg({ msg: res.sesion });
                Ext.getCmp(prototype.id + '-gridAuxiliaryTable').unmask();
            },
            failure: function(response, opts) {
                console.log('server-side failure with status code '+response.status);
                Ext.getCmp(prototype.id + '-gridAuxiliaryTable').unmask();
            }
        });
    },
    setChangeDataRowTable: function(column, e, row, column, x, rowData) {
        this.CHANGEC = 'U';
        var beanOption = x.record.data;
        this.setValue('cmbTable', beanOption.A1172FAMIL);
        this.setValue('cmbDataType', beanOption.A1172TDATA);
        this.setValue('textData', beanOption.A1172DATA);
        this.setValue('cmbIndicador', beanOption.A1172INDIC);
        this.setBlockKeyTBAX(false);
	this.setDisableCMPTB('00000');
	this.getValidateCMPTBAX(beanOption,false);
    },
    // </editor-fold>
    
    btnAddRegisterLabel_click: function() {
        this.winDataEntryRegisterLabel('I');
    },
    btnCancel_clickHandler: function() {
        this.view.close();
    },
    
    btnInsertSQP01090: function() {
        var beanOption = {};
        var msn = 'Are you sure to insert?';
        this.setDataSQP01090(beanOption);
	if(this.setValidateSQP01090(beanOption)){
            if(this.CHANGEC==='U')msn='Are you sure to update?';
            Ext.Msg.show({
                title: '.:PRAXIS:.',
                msg: msn,
                buttons: Ext.MessageBox.OKCANCEL,
                scope: this,
                icon: Ext.MessageBox.QUESTION,
                modal: true,
                fn: function(btn) {
                    if (btn === 'ok') {
                        beanOption.VP_ACTION = this.CHANGEC;
                        this.setSQP01090(beanOption);
                    }
                }
            });
	}
    },
    setDataSQP01090: function(beanOption) {
        beanOption.A1172AIRLI=this.bean.A1155AIRLI;
        beanOption.A1172CODAC=this.bean.A1155CODAC;
        beanOption.A1172INDAC=this.bean.A1155INDAC;
        beanOption.A1172VRSAC=this.bean.A1155VRSAC;

        beanOption.A1172FAMIL= this.getValue('cmbTable')===null?'':this.getValue('cmbTable');
        beanOption.A1172TDATA= this.getValue('cmbDataType')===null?'':this.getValue('cmbDataType');
        beanOption.A1172DATA= this.getValue('textData');
        beanOption.A1172VALOR= this.getValue('textValue')!==''?this.getValue('textValue'):'0';
        beanOption.A1172INDIC= this.getValue('cmbIndicador')===null?'':this.getValue('cmbIndicador');
        beanOption.A1172PORCE= this.getValue('textPencentage')!==''?this.getValue('textPencentage'):'0';
        beanOption.A1172MONED= this.getValue('cmbCurrency');
        beanOption.A1172METOD= this.getValue('cmbMethod')===null?'':this.getValue('cmbMethod');
        beanOption.A1172EQUIV= this.getValue('textEquivalent');
    },
    setValidateSQP01090: function(beanOption) {
        var vl_flag = true;
        if ( beanOption.A1172AIRLI === ''){global.Msg( {msg: 'Enter, AIR LINE '} );vl_flag = false;
	}else if ( beanOption.A1172CODAC === ''){global.Msg( {msg: 'Enter, CODE AGREEMENT'} );vl_flag = false;
	}else if ( beanOption.A1172INDAC === ''){global.Msg( {msg: 'Enter, INDICATOR AGREEMENT'} );vl_flag = false;
	}else if ( beanOption.A1172VRSAC === ''){global.Msg( {msg: 'Enter, VERSION AGREEMENT'} );vl_flag = false;
	}else if ( beanOption.A1172FAMIL === ''){global.Msg( {msg: 'Enter, Nº TABLE'} );vl_flag = false;
	}else if(!this.setValidateInputTB()){vl_flag = false;
	}else if ( beanOption.A1172TDATA === ''){global.Msg( {msg: 'Enter, DATA TYPE'} );vl_flag = false;
	}else if ( beanOption.A1172DATA === ''){global.Msg( {msg: 'Enter, DATA'} );vl_flag = false;
	}else if( beanOption.A1172INDIC === ''){global.Msg( {msg: 'Enter, INDICADOR'} );vl_flag = false;
	}else{
            vl_flag=this.getValidateCMPTBAX(beanOption,true);
            if(!vl_flag)global.Msg( {msg: 'Enter, Parameters is blanck.'} );
	}
	return vl_flag;
    },
    onCmbTableKeypress: function( obj , e , eOpts){
        if ( e.getKey() === e.ENTER ||  e.getKey() === e.TAB ){
            this.setValidateInputTB();
        }
    },
    setValidateInputTB: function() {
        var bool = true;
        if (this.getValue('cmbTable') !== '') {
            if (parseInt(this.getValue('cmbTable')) > 1000 && parseInt(this.getValue('cmbTable')) < 10000 ){
                if (parseInt(this.getValue('cmbTable')) % 5 !== 0 ){
                    this.setValue('cmbTable', null);
                    bool = false;
                    global.Msg({ msg: 'Error. Number Table have a increase of 10 (Example: Last Nuumber Table is 1030 Next 1040).' });
                }
            } else {
                this.setValue('cmbTable', null);
                bool = false;
                global.Msg({ msg: 'Error. Enter Number Table (1XXX).' });
            }
        } else {
            this.setValue('cmbTable', null);
            bool = false;
            global.Msg({ msg: 'Error. Enter Number Table (1XXX).' });
        }
        return bool;
    },
    getValidateCMPTBAX: function(beanOption, bool) {
        var vl_flag = true;
        switch(beanOption.A1172INDIC){
            case '01':
                vl_flag = this.getDisableCMPTB('10000',beanOption,bool);
                break;
            case '02':
                vl_flag = this.getDisableCMPTB('11000',beanOption,bool);
                break;
            case '03':
                vl_flag = this.getDisableCMPTB('10100',beanOption,bool);
                break;
            case '04':
                vl_flag = this.getDisableCMPTB('10110',beanOption,bool);
                break;
            case '05':
                vl_flag = this.getDisableCMPTB('00010',beanOption,bool);
                break;
            case '06':
                vl_flag = this.getDisableCMPTB('11110',beanOption,bool);
                break;
            case '07':
                vl_flag = this.getDisableCMPTB('11110',beanOption,bool);
                break;
            case '08':
                vl_flag = this.getDisableCMPTB('00110',beanOption,bool);
                break;
            case '09':
                vl_flag = this.getDisableCMPTB('00001',beanOption,bool);			
                break;
            case '10':
                vl_flag = this.getDisableCMPTB('10000',beanOption,bool);
                break;
	}
	return vl_flag;
    },
    getDisableCMPTB: function(DNM, beanOption, bool) {
        var SPT = DNM.split("");
        var RT = true;
        if (bool) {
            if(parseInt(SPT[0])&&beanOption.A1172VALOR === '')RT=false;
            if(parseInt(SPT[1])&&beanOption.A1172MONED === '')RT=false;
            if(parseInt(SPT[2])&&beanOption.A1172PORCE === '')RT=false;
            if(parseInt(SPT[3])&&beanOption.A1172METOD === '')RT=false;
            if(parseInt(SPT[4])&&beanOption.A1172EQUIV === '')RT=false;
        } else {
            if(parseInt(SPT[0]))this.setValue('textValue', beanOption.A1172VALOR);
            if(parseInt(SPT[1]))this.setValue('cmbCurrency', beanOption.A1172MONED);
            if(parseInt(SPT[2]))this.setValue('textPencentage', beanOption.A1172PORCE);
            if(parseInt(SPT[3]))this.setValue('cmbMethod', beanOption.A1172METOD);
            if(parseInt(SPT[4]))this.setValue('textEquivalent', beanOption.A1172EQUIV);
            this.setDisableCMPTB(DNM);
        }
        return RT;
    },
    getResetDataInit: function() {
        this.beanSQP01090.A1172AIRLI=this.bean.A1155AIRLI;
	this.beanSQP01090.A1172CODAC=this.bean.A1155CODAC;
	this.beanSQP01090.A1172INDAC=this.bean.A1155INDAC;
	this.beanSQP01090.A1172VRSAC=this.bean.A1155VRSAC;
        this.getINIT(this.beanSQP01090);
    },
    getListLabel: function() {
        Ext.getCmp(prototype.id+'-gridRegisterLabel').getStore().removeAll();
        var LIATA = {};
        LIATA.VP_AIRLINE='139';
        LIATA.VP_INDAC='U';
        LIATA.VP_CODE=this.getValue('textA1155CODAC');
        LIATA.VP_IATA=this.getValue('textA1155VRSAC');
        this.getListLabelM(LIATA);
    },
    // <editor-fold defaultstate="collapsed" desc="setGROUPCODE">
    setGROUPCODE: function(LIATA) {
        Ext.Ajax.request({
            url: prototype.url+'/setGROUPCODE',
            method: 'POST',
            timeout: 60000000,
            params: LIATA,
            beforerequest: Ext.getCmp('DataEntryInputSchemeUpfrontForm').mask('Loading...'),
            success: function(response, options){
                var res = Ext.JSON.decode(response.responseText);
                if (res.success) {
                    var lstArray = res.response;
                    var objPSA00004 = lstArray[0];
                    Ext.Msg.show({
                        title: '.:PRAXIS:.',
                        msg: objPSA00004.OU_MESSAGE,
                        buttons: Ext.MessageBox.OK,
                        scope: this,
                        icon: Ext.MessageBox.INFO,
                        modal: true,
                        fn: function(btn) {
                            if (btn === 'ok') {
                                if(objPSA00004.OU_SQLCODE==='0'){
                                    Ext.getCmp(prototype.id + '-btnSearch2').fireEvent('click', {});
                                }
                            }
                        }
                    });
                } else global.Msg({ msg: res.sesion });
                Ext.getCmp('DataEntryInputSchemeUpfrontForm').unmask();
            },
            failure: function(response, opts) {
                console.log('server-side failure with status code '+response.status);
                Ext.getCmp('DataEntryInputSchemeUpfrontForm').unmask();
            }
        });
    },
    // </editor-fold>
    
    // <editor-fold defaultstate="collapsed" desc="getListIATAGROUP">
    getListIATAGROUPM: function(LIATA) {
        var storeGridDatas = Ext.create('Ext.Praxis.store.sales.InputSchemeUpfront.GridDataListIATAGROUP', {
            proxy: {
                url: prototype.url+'/getListIATAGROUP'
            },
            listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = LIATA;
                },
                load: function(obj, obj2, success, obj4, obj5) {
                    global.clear();
                }
            }
        });
        Ext.getCmp(prototype.id+'-gridAirlineExtra').bindStore(storeGridDatas);
    },
    // </editor-fold>
    
    // <editor-fold defaultstate="collapsed" desc="getListLabelM">
    getListLabelM: function(LIATA) {
        var storeGridDatas = Ext.create('Ext.Praxis.store.sales.InputSchemeUpfront.GridDataListLabel', {
            proxy: {
                url: prototype.url+'/getListLabel'
            },
            listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = LIATA;
                },
                load: function(obj, obj2, success, obj4, obj5) {
                    global.clear();
                }
            }
        });
        Ext.getCmp(prototype.id+'-gridRegisterLabel').bindStore(storeGridDatas);
    },
    // </editor-fold>
    
    // <editor-fold defaultstate="collapsed" desc="getINIT">
    getINIT: function(beanSQP01090) {
        Ext.Ajax.request({
            url: prototype.url+'/getINIT',
            method: 'POST',
            timeout: 60000000,
            params: beanSQP01090,
            beforerequest: Ext.getCmp('DataEntryInputSchemeUpfrontForm').mask('Loading...'),
            success: function(response, options){
                var res = Ext.JSON.decode(response.responseText);
                if (res.success) {
                    var lst = res.response;
                    var lstTableTmp = res.lstTableTmp;
                    var lstTableREF = res.lstTableREF;
                    
                    var storeGridData = Ext.create("Ext.Praxis.store.sales.InputSchemeUpfront.GridDataAirlineExtra", {
                        data: lst
                    });
                    Ext.getCmp(prototype.id + '-gridAirlineExtra').bindStore(storeGridData);
                    
                    Ext.getCmp(prototype.id+'-gridFunction').getStore().removeAll();
                    var storeGridData = Ext.create("Ext.Praxis.store.sales.InputSchemeUpfront.GridDataFunction", {
                        data: lstTableTmp
                    });
                    Ext.getCmp(prototype.id + '-gridFunction').bindStore(storeGridData);
                    
                    Ext.getCmp(prototype.id+'-gridReferentes').getStore().removeAll();
                    var storeGridData = Ext.create("Ext.Praxis.store.sales.InputSchemeUpfront.GridDataReferentes", {
                        data: lstTableREF
                    });
                    Ext.getCmp(prototype.id + '-gridReferentes').bindStore(storeGridData);
                } else global.Msg({ msg: res.sesion });
                Ext.getCmp('DataEntryInputSchemeUpfrontForm').unmask();
            },
            failure: function(response, opts) {
                console.log('server-side failure with status code '+response.status);
                Ext.getCmp('DataEntryInputSchemeUpfrontForm').unmask();
            }
        });
    },
    // </editor-fold>
    
    getListIATAGROUP: function() {
        var LIATA = {};
        LIATA.VP_AIRLINE='139';
        LIATA.VP_IATA='';
        LIATA.VP_INDAC=this.bean.A1155INDAC;
        LIATA.VP_CODE=this.bean.A1155CODAC;
        this.getListIATAGROUPM(LIATA);
    },
    validaCampoSTEP: function(cmp) {
        
    },
    getParamt: function(VP_CODIGO, VP_POSITION) {//linea 1252
        var tempArray = new Array();
        VP_CODIGO = VP_CODIGO.trim();
        VP_POSITION = VP_POSITION.trim();
        try{
            for(var i = 0; i < this.p.lstPARAMTG.length; i++){ 
                var obj = this.p.lstPARAMTG[i];
                if(obj.idpadre===VP_CODIGO && obj.POSITION===VP_POSITION)
                tempArray.addItem({data : obj.data, label : obj.label,idpadre : obj.idpadre,nombrepadre : obj.nombrepadre,METHOD:obj.METHOD,NPARAMT:obj.NPARAMT,TVALID:obj.TVALID,DRINKID:obj.DRINKID,DRINKKEY:obj.DRINKKEY});
            }
        }catch(error){ global.Msg( {msg: error.message} ); }
        return tempArray;
    },
    getEvent: function() {
        this.getClearHandler();
        this.getProccessPatron();
    },
    // <editor-fold defaultstate="collapsed" desc="getProccessPatron">
    getProccessPatron: function () {
        var  CMPAP = this.beanCOMPONENT.CMPAP;
        var  CMPCP = this.beanCOMPONENT.CMPCP;
        var  CMPEP = this.beanCOMPONENT.CMPEP;

        var  CMPAF = this.beanCOMPONENT.CMPAF;
        var  CMPCF = this.beanCOMPONENT.CMPCF;
        var  CMPEF = this.beanCOMPONENT.CMPEF;

        var  CMPATV = this.beanCOMPONENT.CMPATV;
        var  CMPCTV = this.beanCOMPONENT.CMPCTV;
        var  CMPETV = this.beanCOMPONENT.CMPETV;

        var  CMPADR = this.beanCOMPONENT.CMPADR;
        var  CMPCDR = this.beanCOMPONENT.CMPCDR;
        var  CMPEDR = this.beanCOMPONENT.CMPEDR;

        var  CMPAKY = this.beanCOMPONENT.CMPAKY;
        //this.LOG(CMPAKY);
        var x=0,complet=0,coma='',bool=false,CMPAPX=CMPAP;
        var data = new Array(this.beanCOMPONENT.CMPA,this.beanCOMPONENT.CMPB, this.beanCOMPONENT.CMPC,this.beanCOMPONENT.CMPE,this.beanCOMPONENT.CMPF,this.beanCOMPONENT.CMPG,this.beanCOMPONENT.CMPH,this.beanCOMPONENT.CMPI);
        //this.LOG(CMPAPX);
        this.setResetParantSend();
        this.beanRESTRICTION.PARAMET='';
        this.beanRESTRICTION.DELIMITER='|';
        
        if(!this.beanCOMPONENT.CMPAB){
            if(CMPATV==='H'){
                if(CMPADR==='N' || CMPADR==='Y')x=1;
                //if(CMPADR=='Y')CMPAP-=1;
                if(CMPAKY==='Y'){
                    this.beanRESTRICTION.PARAMET=this.EDIT_AIRLI+"|"+this.EDIT_CODAC+"|"+this.EDIT_INDAC+"|"+this.EDIT_VRSAC+"|"+this.TYPE_MODULE+"|";
                }
                if(CMPADR==='Y' || CMPADR==='S'){CMPAP-=1;
                    this.beanRESTRICTION.PARAMET+=this.beanCOMPONENT.CMPA1+"|";
                }
                for(var i=x;i<CMPAP+x;i++){
                    this.beanRESTRICTION.PARAMET+=coma+""+data[i];coma="|";
                    if(data[i]!=='')complet++;
                }
                if(complet!==0)if(complet===CMPAP)bool=true;

                this.beanRESTRICTION.NPARAMET=CMPAPX +(CMPAKY==='N'?0:4);//CANTIDAD DE KEYS
                this.beanRESTRICTION.METHOD=CMPAF;
            }else if(CMPATV==='L'){
                if(CMPAP===0){
                    this.beanCOMPONENT.CMPAB=true;
                    this.beanCOMPONENT.CMPEB=this.getPoint();
                }else{
                    //PROCCESS LOCAL
                }
            }
        }else if(!this.beanCOMPONENT.CMPEB){
            var data = new Array(this.beanCOMPONENT.CMPE,this.beanCOMPONENT.CMPF,this.beanCOMPONENT.CMPG,this.beanCOMPONENT.CMPH,this.beanCOMPONENT.CMPI);
            this.beanRESTRICTION.NPARAMET=CMPEP;
            this.beanRESTRICTION.METHOD=CMPEF;

            if(CMPETV==='H'){
                if(CMPEDR==='N')x=1;
                for(var i=x;i<CMPEP+x;i++){
                    this.beanRESTRICTION.PARAMET+=coma+""+data[i];coma="|";
                    if(data[i]!=='')complet++;
                }
                if(complet!==0)if(complet===CMPEP)bool=true;
            }else if(CMPETV==='L'){
                
            }
        }
        if(bool){
//            getProgressBar(true);
//            setExec(this.CONSOLE_DESTINATION,"getRestriction",this.beanRESTRICTION,onRestriction);
        }else{
            this.getFocoHandler();
        }
    },
    // </editor-fold>
    // <editor-fold defaultstate="collapsed" desc="getFocoHandler">
    getFocoHandler: function() {
        if(this.beanCOMPONENT.CMPA===''){
            this.getComponents('F100000000');
            return false;
        }else if(this.beanCOMPONENT.CMPB===''){
            if(this.beanCOMPONENT.CMPADR!=='S'){
                if(this.beanCOMPONENT.CMPAP!==0){
                    Ext.getCmp(prototype.id+'-CMPB').enable(true);
                    this.getComponents('F010000000');
                    return false;
                }else{
                    this.CMPB.enabled=false;
                    //getComponents('F001000000');
                }				
            }else{
                if(this.beanCOMPONENT.CMPAP!==2){
                    Ext.getCmp(prototype.id+'-CMPB').enable(true);//EVALUAR LA CANTIDA DE PARAMETROS PARA BLOQUEAR EN TYPE S
                    this.getComponents('F010000000');
                    return false;
                }else{
                    Ext.getCmp(prototype.id+'-CMPB').disable(true);
                }
            }
        }
        if(this.beanCOMPONENT.CMPC==='' && this.beanCOMPONENT.CMPD===''){
            this.getComponents('F001000000');
            return false;
        }else{
            if(!this.getPoint()){
                if(this.beanCOMPONENT.CMPE===''){
                    this.getComponents('F000010000');
                    return false;
                }else if(this.beanCOMPONENT.CMPF===''){
                    this.getComponents('F000001000');
                    return false;
                }else if(this.beanCOMPONENT.CMPG===''){
                    this.getComponents('F000000100');
                    return;
                }else if(this.beanCOMPONENT.CMPH===''){
                    this.getComponents('F000000010');
                    return false;
                }else if(this.beanCOMPONENT.CMPI===''){
                    this.getComponents('F000000001');
                    return false;
                }
            }else{
                var data = new Array(this.beanCOMPONENT.CMPE,this.beanCOMPONENT.CMPF,this.beanCOMPONENT.CMPG,this.beanCOMPONENT.CMPH,this.beanCOMPONENT.CMPI);
                var bool=true,ps=1;
                for(var i=1;i<=data.length;i++){
                    if(data[i-1]===''){
                        if(bool){ps=i;bool=!bool;}
                    }else{
                        bool=true;
                    }
                }
                switch(ps){
                    case 1:
                        this.getComponents('F000010000');
                        break;
                    case 2:
                        this.getComponents('F000001000');
                        break;
                    case 3:
                        this.getComponents('F000000100');
                        break;
                    case 4:
                        this.getComponents('F000000010');
                        break;
                    case 5:
                        this.getComponents('F000000001');
                        break;
                }
            }
        }
    },
    // </editor-fold>
    setResetParantSend: function() {
        this.beanRESTRICTION.NPARAMET=0;
        this.beanRESTRICTION.PARAMET='';
        this.beanRESTRICTION.METHOD='';
        this.beanRESTRICTION.DELIMITER='|';
    },
    setClearVar: function() {
        try{
            this.setClearComponent();
            this.getComponents('G111111111');
        }catch(error){}
    },
    // <editor-fold defaultstate="collapsed" desc="getClearHandler">
    getClearHandler: function() {
        this.setClearVar();
        if(this.beanCOMPONENT.CMPA===''){
            this.getComponents('C011111111');
            return false;
        }else if(this.beanCOMPONENT.CMPB===''){// && !this.beanCOMPONENT.CMPAB
            if(this.beanCOMPONENT.CMPAP!==0){
                if(this.beanCOMPONENT.CMPADR!=='S'){
                    this.getComponents('C001111111');
                    return false;
                }
            }else{
                Ext.getCmp(prototype.id+'-CMPB').disable(true);
                if(!this.beanCOMPONENT.CMPAB)this.getComponents('C011111111');
            }
        }if(this.beanCOMPONENT.CMPC==='' && this.beanCOMPONENT.CMPD===''){
            this.getComponents('C000111111');
            return false;
        }else if(this.beanCOMPONENT.CMPE==='' && !this.getPositionClear(5)){
            this.getComponents('C000001110');
            return false;
        }else if(this.beanCOMPONENT.CMPF==='' && !this.getPositionClear(6)){
            this.getComponents('C000000110');
            return false;
        }else if(this.beanCOMPONENT.CMPG==='' && this.beanCOMPONENT.CMPH===''){
            this.getComponents('C000000010');
            return false;
        }
    },
    // </editor-fold>
    getPositionClear: function(P) {
        var bool = false;
        var PARMT = this.beanCOMPONENT.CMPAP;
        var DRINK = this.beanCOMPONENT.CMPADR;
        if(DRINK==='Y' || DRINK==='S')PARMT-=1;
        if(DRINK==='S'){
            if(this.getPoint() && PARMT <= (P-1))bool=true; 
        } else{
            if(this.getPoint() && (PARMT+1) <= (P-1))bool=true;
        }
        return bool;
    },
    // <editor-fold defaultstate="collapsed" desc="getComponents">
    getComponents: function(DNM) {
        var SPT = DNM.split("");
        switch (SPT[0]) {
            case 'F':
                try{
                    /**A**/
                    if(parseInt(SPT[1])){
                        this.setValue('CMPA', null);
                        this.focus('CMPA');
                    }
                    if(parseInt(SPT[2])){
                        this.setValue('CMPB', null);
                        this.focus('CMPB');
                    }
                    if(parseInt(SPT[3])){
                        this.setValue('CMPC', null);
                        this.focus('CMPC');
                    }
                    if(parseInt(SPT[4])){
                        this.focus('CMPD');
                    }
                    /**B**/
                    if(parseInt(SPT[5])){
                        this.setValue('CMPE', null);
                        this.focus('CMPE');
                    }
                    if(parseInt(SPT[6])){
                        this.setValue('CMPF', null);
                        this.focus('CMPF');
                    }
                    if(parseInt(SPT[7])){
                        this.focus('CMPG');
                    }
                    if(parseInt(SPT[8])){
                        this.focus('CMPH');
                    }
                    if(parseInt(SPT[9])){
                        this.focus('CMPI');
                    }
                }catch(err){
                    global.Msg( {msg: err.message+" FOCUS"} );
                }
                break;
            case 'G':
                /**A**/
                try{
                    if(parseInt(SPT[1])){
                        var CMPA = this.getValue('CMPA');
                        var selectedIndex = Ext.getCmp(prototype.id+'-CMPA').getStore().indexOf(Ext.getCmp(prototype.id+'-CMPA').getSelectedRecord());
                        if(selectedIndex!==-1){
                            var selectedItem = this.getSelectedItemFUNCTION(CMPA);
                            this.beanCOMPONENT.CMPADR=selectedItem.DRINKID;
                            this.beanCOMPONENT.CMPAKY=selectedItem.DRINKKEY;

                            if(this.beanCOMPONENT.CMPADR!=='S')this.beanCOMPONENT.CMPA=selectedItem.data;
                            this.beanCOMPONENT.CMPA1=selectedItem.data;
                            this.beanCOMPONENT.CMPA1F=selectedItem.nombrepadre;

                            this.beanCOMPONENT.CMPAP=selectedItem.NPARAMT;

                            this.beanCOMPONENT.CMPAF=selectedItem.METHOD;

                            this.beanCOMPONENT.CMPATV=selectedItem.TVALID;

                            if(this.beanCOMPONENT.CMPADR==='S'){
                                Ext.getCmp(prototype.id+'-CMPLBL').setText('('+selectedItem.label+')');
                                this.setValue('CMPA', null);
                            }else{
                                Ext.getCmp(prototype.id+'-CMPLBL').setText('');
                            }
                        } else{
                            if(this.beanCOMPONENT.CMPADR==='S'){
                                this.beanCOMPONENT.CMPA=CMPA;
                            }else{
                                Ext.getCmp(prototype.id+'-CMPLBL').setText('');
                            }
                        }
                    }
                } catch(err){  }
                
                /**B**/
                try{
                    if(parseInt(SPT[2]))this.beanCOMPONENT.CMPB=this.getValue('CMPB');
                } catch(err){  }
                /**C**/
                try{
                    if(parseInt(SPT[3])){
                        this.beanCOMPONENT.CMPC=this.getValue('CMPC');
                    }
                } catch(err){  }
                
                /**D**/
                if(parseInt(SPT[4])){
                    try{
                        /*if(this.CMPC.selectedIndex!=-1){
                                this.CMPD.enabled=false;
                                this.CMPD.text='';
                                beanCOMPONENT.CMPD='';
                        }else{*/
                            Ext.getCmp(prototype.id+'-CMPD').enable(true);
                            this.beanCOMPONENT.CMPD=this.getValue('CMPD');
                        //}
                    } catch(err){ Ext.getCmp(prototype.id+'-CMPD').enable(true); }
                }
                /**E**/
                try{
                    var selectedIndex = Ext.getCmp(prototype.id+'-CMPE').getStore().indexOf(Ext.getCmp(prototype.id+'-CMPE').getSelectedRecord());
                    if(parseInt(SPT[5])){
                        var CMPE = this.getValue('CMPE');
                        if(selectedIndex!==-1){
                            var selectedItem = this.getSelectedItemFUNCTIONA(CMPE);
                            this.beanCOMPONENT.CMPE=selectedItem.data;
                            this.beanCOMPONENT.CMPEP=selectedItem.NPARAMT;
                            this.beanCOMPONENT.CMPEF=selectedItem.METHOD;
                            this.beanCOMPONENT.CMPETV=selectedItem.TVALID;
                            this.beanCOMPONENT.CMPEDR=selectedItem.DRINKID;
                        }else{
                            this.beanCOMPONENT.CMPE=CMPE.trim();
                        }
                    }
                } catch(err){ this.beanCOMPONENT.CMPE=this.getValue('CMPE').trim(); }

                /**F**/
                try{
                    if(parseInt(SPT[6])){
                        if(selectedIndex!==-1){
                            this.beanCOMPONENT.CMPF=this.getValue('CMPF');
                        }else{
                            this.beanCOMPONENT.CMPF=this.getValue('CMPF').trim();
                        }
                    }
                } catch(err){ this.beanCOMPONENT.CMPF=this.getValue('CMPF'); }
                /**G**/
                try{
                    if(parseInt(SPT[7]))this.beanCOMPONENT.CMPG=this.getValue('CMPG').trim();
                } catch(err){ global.Msg({msg: err.message+" G"}); }
                /**H**/
                try{
                    if(parseInt(SPT[8]))this.beanCOMPONENT.CMPH=this.getValue('CMPH').trim();
                } catch(err){ global.Msg({msg: err.message+" H"}); }
                /**I**/
                try{
                    if(parseInt(SPT[9]))this.beanCOMPONENT.CMPI=this.getValue('CMPI').trim();
                } catch(err){ global.Msg({msg: err.message+" I"}); }
                break;
            case 'E':
                /**A**/
                if(parseInt(SPT[1])) Ext.getCmp(prototype.id+'-CMPA').enable(true);
                else Ext.getCmp(prototype.id+'-CMPA').disable(true);
                
                if(parseInt(SPT[2])) Ext.getCmp(prototype.id+'-CMPB').enable(true);
                else Ext.getCmp(prototype.id+'-CMPB').disable(true);
                
                if(parseInt(SPT[3])) Ext.getCmp(prototype.id+'-CMPC').enable(true);
                else Ext.getCmp(prototype.id+'-CMPC').disable(true);
                
                if(parseInt(SPT[4])) Ext.getCmp(prototype.id+'-CMPD').enable(true);
                else Ext.getCmp(prototype.id+'-CMPD').disable(true);
                
                /**B**/
                if(parseInt(SPT[5])) Ext.getCmp(prototype.id+'-CMPE').enable(true);
                else Ext.getCmp(prototype.id+'-CMPE').disable(true);
                
                if(parseInt(SPT[6])) Ext.getCmp(prototype.id+'-CMPF').enable(true);
                else Ext.getCmp(prototype.id+'-CMPF').disable(true);
                
                if(parseInt(SPT[7])) Ext.getCmp(prototype.id+'-CMPG').enable(true);
                else Ext.getCmp(prototype.id+'-CMPG').disable(true);
                
                if(parseInt(SPT[8])) Ext.getCmp(prototype.id+'-CMPH').enable(true);
                else Ext.getCmp(prototype.id+'-CMPH').disable(true);
                
                if(parseInt(SPT[9])) Ext.getCmp(prototype.id+'-CMPI').enable(true);
                else Ext.getCmp(prototype.id+'-CMPI').disable(true);
                break;
            case 'C':
                try{
                    /**A**/
                    if(this.beanCOMPONENT.CMPADR!=='S'){
                        if(parseInt(SPT[1])){
                            this.setValue('CMPA', null);
                        }
                    }
                    if(parseInt(SPT[2]))this.setValue('CMPB', null);
                    if(parseInt(SPT[3]))this.setValue('CMPC', null);
                    if(parseInt(SPT[4]))this.setValue('CMPD', null);
                    /**B**/
                    if(parseInt(SPT[5]))this.setValue('CMPE', null);
                    if(parseInt(SPT[6]))this.setValue('CMPF', null);
                    if(parseInt(SPT[7]))this.setValue('CMPG', null);
                    if(parseInt(SPT[8]))this.setValue('CMPH', null);
                    if(parseInt(SPT[9]))this.setValue('CMPI', null);
                }catch(err){
                    global.Msg({msg: err.message+" CLEAR"});
                }
                break;
        }
    },
    // </editor-fold>
    getSelectedItemFUNCTION: function(valueField) {
        var item;
        if (valueField!==null) {
            var lst = this.p.lstFUNCTION;
            for (var i = 0; i < lst.length; i++) {
                if (lst[i].data === valueField) {
                    item = lst[i];
                    break;
                }
            }
        }
        return item;
    },
    getSelectedItemFUNCTIONA: function(valueField) {
        var item;
        if (valueField!==null) {
            var lst = this.p.lstFUNCTIONA;
            for (var i = 0; i < lst.length; i++) {
                if (lst[i].data === valueField) {
                    item = lst[i];
                    break;
                }
            }
        }
        return item;
    },
    // <editor-fold defaultstate="collapsed" desc="setClearComponent">
    setClearComponent: function() {
        this.beanCOMPONENT.DNM = '';
        this.beanCOMPONENT.CODEERROR = '';
        this.beanCOMPONENT.RESPONSE = '';
        this.beanCOMPONENT.CMPAKY='';
        if(this.beanCOMPONENT.CMPADR!=='S'){
            this.beanCOMPONENT.CMPA1='';
            this.beanCOMPONENT.CMPA1F='';
            this.beanCOMPONENT.CMPA = '';
            this.beanCOMPONENT.CMPAP = 0;
            this.beanCOMPONENT.CMPAF= '';
            this.beanCOMPONENT.CMPATV= 'H';
            this.beanCOMPONENT.CMPADR= 'N';
        }
        this.beanCOMPONENT.CMPB = '';
        this.beanCOMPONENT.CMPC = '';
        this.beanCOMPONENT.CMPD = '';
        this.beanCOMPONENT.CMPE = '';
        this.beanCOMPONENT.CMPF = '';
        this.beanCOMPONENT.CMPG = '';
        this.beanCOMPONENT.CMPH = '';
        this.beanCOMPONENT.CMPI = '';

        this.beanCOMPONENT.CMPCF = '';
        this.beanCOMPONENT.CMPEF = '';

        this.beanCOMPONENT.CMPCP = 0;
        this.beanCOMPONENT.CMPEP = 0;

        this.beanCOMPONENT.CMPCTV = '';
        this.beanCOMPONENT.CMPETV = '';
    },
    // </editor-fold>
    setChangeStatus: function(cmp) {
        if (cmp<3) {
            this.beanCOMPONENT.CMPAB=false;
            this.beanCOMPONENT.CMPEB=false;
        } else {
            this.beanCOMPONENT.CMPEB=this.getPoint();
        }
        
    },
    getPoint: function() {
        var bool = false;
        var PARMT = this.beanCOMPONENT.CMPAP;
        var DRINK = this.beanCOMPONENT.CMPADR;
        if(DRINK==='Y' || DRINK==='S')PARMT-=1;
        if(DRINK==='S'){
            if(PARMT > 2)bool=true; 
        }else{
            if(PARMT > 1)bool=true;
        }
        return bool;
    },
    clearLoads: function() {
        this.TBFR=false;
	this.TBTW=false;
	this.TBTR=false;
    },
    setDisableCMPTB: function(DNM) {
        var SPT = DNM.split("");
        if(Number(SPT[0])) Ext.getCmp(prototype.id+'-textValue').enable(true);
        else Ext.getCmp(prototype.id+'-textValue').disable(true);
        
        if(Number(SPT[1])) Ext.getCmp(prototype.id+'-cmbCurrency').enable(true);
        else Ext.getCmp(prototype.id+'-cmbCurrency').disable(true);
        
        if(Number(SPT[2])) Ext.getCmp(prototype.id+'-textPencentage').enable(true);
        else Ext.getCmp(prototype.id+'-textPencentage').disable(true);
        
        if(Number(SPT[3])) Ext.getCmp(prototype.id+'-cmbMethod').enable(true);
        else Ext.getCmp(prototype.id+'-cmbMethod').disable(true);
        
        if(Number(SPT[4])) Ext.getCmp(prototype.id+'-textEquivalent').enable(true);
        else Ext.getCmp(prototype.id+'-textEquivalent').disable(true);
    },
    // <editor-fold defaultstate="collapsed" desc="limpiarData">
    limpiarData: function() {
        this.setValue('textNameScheme', '');
        this.setValue('textA1155CODAC', '');
        this.setValue('textA1155VRSAC', '');
        this.setValue('CHKA1155FLGAD', false);//
        this.setValue('txtA1155FINI', '');
        this.setValue('txtA1155FFIN', '');
        this.setValue('CHKA1155FFIN', false);//
	Ext.getCmp(prototype.id+'-txtA1155FFIN').enable(true);
        this.setValue('cmbA1155FLGFE', null);
        this.setValue('CHKA1155FLGAU', false);//
        this.setValue('cmbA1155FESTA', null);
        this.setValue('RBDA1155IDSCO', false);//
        this.setValue('txtA1155PDEFA', '00');
        this.setValue('txtA1155FRECE', '');
        
        this.setValue('textRegister', '');
        this.setValue('textUser', '');
        this.setValue('textLastUpdate', '');
        this.setValue('textLastUser', '');
        this.setValue('textCertified', '');
        this.setValue('textCertifiedUser', '');
        
        Ext.getCmp(prototype.id+'-gridGlobalLogic').getStore().removeAll();
        Ext.getCmp(prototype.id+'-gridFunction').getStore().removeAll();
        Ext.getCmp(prototype.id+'-gridAirlineExtra').getStore().removeAll();
        
        Ext.getCmp(prototype.id+'-gridReferentes').getStore().removeAll();
        Ext.getCmp(prototype.id+'-gridAuxiliaryTable').getStore().removeAll();
        
	this.lstTABLEAX = new Array();
	this.lstTABLEAXX = new Array();
	this.lstTDATA = new Array();
	lstMETOD = new Array();
        this.setClearAuxiliaryTable();
        this.setNewTBAX();
        Ext.getCmp(prototype.id+'-gridAirlineExtra').getStore().removeAll();
        Ext.getCmp(prototype.id+'-gridRegisterLabel').getStore().removeAll();
        Ext.getCmp(prototype.id+'-gridGlobalLogic4').getStore().removeAll();
        Ext.getCmp(prototype.id+'-gridGlobalLogic5').getStore().removeAll();
        this.XSC = true;
        this.LLABEL = false;
        this.XCN = 0;
        Ext.getCmp(prototype.id+'-gridAirlineExtra').getStore().removeAll();
        Ext.getCmp(prototype.id+'-gridRequires').getStore().removeAll();
        Ext.getCmp(prototype.id+'-gridMSN').getStore().removeAll();
    },
    // </editor-fold>
    setClearAuxiliaryTable: function() {
        this.setValue('textData', '');
        this.setValue('textValue', '');
        this.setValue('textPencentage', '');
        this.setValue('cmbCurrency', '');
        this.setValue('cmbMethod', '');
        this.setValue('textEquivalent', '');
    },
    setNewTBAX: function() {
        this.setBlockKeyTBAX(true);
        this.setDisableCMPTB('00000');
        this.setValue('cmbIndicador', '');
        this.setValue('textValue', '');
        this.setValue('cmbCurrency', '');
        this.setValue('textPencentage', '');
        this.setValue('cmbMethod', '');
        this.setValue('textEquivalent', '');
        
    },
    setBlockKeyTBAX: function(bool) {
        if (bool) {
            Ext.getCmp(prototype.id+'-cmbTable').enable(true);
            Ext.getCmp(prototype.id+'-cmbDataType').enable(true);
            Ext.getCmp(prototype.id+'-textData').enable(true);
        } else {
            Ext.getCmp(prototype.id+'-cmbTable').disable(true);
            Ext.getCmp(prototype.id+'-cmbDataType').disable(true);
            Ext.getCmp(prototype.id+'-textData').disable(true);
        }
    },
    getHiddenTab: function(bool) {
        var tabPanel = Ext.getCmp(prototype.id+'-TabMaster');
        tabPanel.items.items[1].tab.setVisible(!bool);
        tabPanel.items.items[2].tab.setVisible(bool);
        tabPanel.items.items[3].tab.setVisible(bool);
    },
    setHideBTN: function(bool) {
        Ext.getCmp(prototype.id+'-btn2').setVisible(bool);
        Ext.getCmp(prototype.id+'-btn3').setVisible(bool);
        Ext.getCmp(prototype.id+'-btn2').setHeight(bool?63:0);
        Ext.getCmp(prototype.id+'-btn3').setHeight(bool?63:0);
    },
    setBlockCMP: function(bool) {
        if (bool) {
            Ext.getCmp(prototype.id+'-cmbA1155FESTA').enable(true);
            Ext.getCmp(prototype.id+'-txtA1155FINI').enable(true);
            Ext.getCmp(prototype.id+'-txtA1155FFIN').enable(true);
            Ext.getCmp(prototype.id+'-CHKA1155FFIN').enable(true);
            Ext.getCmp(prototype.id+'-txtA1155FRECE').enable(true);
            Ext.getCmp(prototype.id+'-cmbA1155FLGFE').enable(true);
            Ext.getCmp(prototype.id+'-CHKA1155FLGAU').enable(true);
            Ext.getCmp(prototype.id+'-CHKA1155FLGAD').enable(true);
            Ext.getCmp(prototype.id+'-RBDA1155IDSCO').enable(true);
            Ext.getCmp(prototype.id+'-txtA1155PDEFA').enable(true);
        } else {
            Ext.getCmp(prototype.id+'-cmbA1155FESTA').disable(true);
            Ext.getCmp(prototype.id+'-txtA1155FINI').disable(true);
            Ext.getCmp(prototype.id+'-txtA1155FFIN').disable(true);
            Ext.getCmp(prototype.id+'-CHKA1155FFIN').disable(true);
            Ext.getCmp(prototype.id+'-txtA1155FRECE').disable(true);
            Ext.getCmp(prototype.id+'-cmbA1155FLGFE').disable(true);
            Ext.getCmp(prototype.id+'-CHKA1155FLGAU').disable(true);
            Ext.getCmp(prototype.id+'-CHKA1155FLGAD').disable(true);
            Ext.getCmp(prototype.id+'-RBDA1155IDSCO').disable(true);
            Ext.getCmp(prototype.id+'-txtA1155PDEFA').disable(true);
        }
    },
    setData: function() {
        var store, data;
        // <editor-fold defaultstate="collapsed" desc="CMPA">
        data = new Array();
        this.lstFUNCTION.forEach(function callback(currentValue, index, array) {
            data.push([currentValue.data, currentValue.label]);
        });
        store = Ext.create('Ext.data.ArrayStore', {
            storeId: 'funciones', autoLoad: true, data: data, fields: ['code', 'name']
        });
        Ext.getCmp(prototype.id+'-CMPA').bindStore(store);
        // </editor-fold>
        
        // <editor-fold defaultstate="collapsed" desc="CMPC">
        data = new Array();
        this.lstFUNCTIONA.forEach(function callback(currentValue, index, array) {
            data.push([currentValue.data, currentValue.label]);
        });
        store = Ext.create('Ext.data.ArrayStore', {
            storeId: 'funcionesA', autoLoad: true, data: data, fields: ['code', 'name']
        });
        Ext.getCmp(prototype.id+'-CMPC').bindStore(store);
        // </editor-fold>
    },
    // <editor-fold defaultstate="collapsed" desc="setLoads">
    setLoads: function(index) {
        if (this.actionCode === 'U') {
            switch (index) {
                case 0:
                    if (!this.TBFR) {
                        this.TBFR = true;
                        this.setDataInput();
                    }
                    break;
                case 1:
                    if (!this.TBTW) {
                        this.TBTW = true;
                        this.getListViewCCode();
                    }
                    break;
                case 2:
                    if(!this.TBTW){
                        this.TBTW=true;
//                        CS.setIndexParant(bean.A1155AIRLI,bean.A1155CODAC,bean.A1155INDAC,bean.A1155VRSAC,'AM');
//                        CS.getResetGrid();
                    }
                    break;
                case 3:
                    if(!this.TBTR){
                        this.TBTR=true;
                        this.getSQP01090('');
                    }
                    break;
                case 4:
                    var cbxCountryAC = Ext.getCmp(prototype.id+'-cmbPais').getStore().data;
                    if (cbxCountryAC.length === 0){
                        this.getListCountry();
                        Ext.getCmp(prototype.id + '-cmbPeriod').bindStore(this.MENSUAL);
                        this.setValue('cmbPeriod', "1");
                    }
                break;
            }
        }
    },
    // </editor-fold>
    getCheckList: function() {
        this.setClearDataColumn();
        this.beanSQP01597.VP_AIRLI= this.bean.A1155AIRLI;
        this.beanSQP01597.VP_CODAC=this.bean.A1155CODAC;
        this.beanSQP01597.VP_INDAC=this.bean.A1155INDAC;
        this.beanSQP01597.VP_VRSAC=this.bean.A1155VRSAC;
        if (this.getValue('cmbDateFromYear') === null) {
            global.Msg({ msg: 'Selected Year' });
            return false;
        } else {
            this.beanSQP01597.VP_YEAR=this.getValue('cmbDateFromYear');
        }
        if (this.getValue('cmbtypeperiod') === null) {
            global.Msg({ msg: 'Selected Type Period' });
            return false;
        } else {
            this.beanSQP01597.VP_TPERI=this.getValue('cmbtypeperiod');
        }
        if (this.getValue('cmbPeriod') === null) {
            global.Msg({ msg: 'Selected Period' });
            return false;
        } else {
            this.beanSQP01597.VP_PERIO=this.getValue('cmbPeriod');
        }
        this.getCheckListM(this.beanSQP01597);
    },
    getCheckListM: function (beanSQP01597) {
        var storeGridDatas = Ext.create('Ext.Praxis.store.sales.InputSchemeUpfront.GridDataCheckList', {
            proxy: {
                url: prototype.url+'/getCheckList'
            },
            listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = beanSQP01597;
                },
                load: function(obj, obj2, success, obj4, obj5) {
                    me.getStatusList();
                    global.clear();
                }
            }
        });
        Ext.getCmp(prototype.id+'-gridRequires').bindStore(storeGridDatas);
    },
    // <editor-fold defaultstate="collapsed" desc="setProccessLC">
    setProccessLC: function() {
        var beanOption = {};
        this.setClearDataColumn();
        this.beanSQP01597.A3012AIRLI= this.bean.A1155AIRLI;
	this.beanSQP01597.A3012CODAC=this.bean.A1155CODAC;
	this.beanSQP01597.A3012INDAC=this.bean.A1155INDAC;
	this.beanSQP01597.A3012VRSAC=this.bean.A1155VRSAC;
	
	this.beanSQP01597.VP_ACTION=this.getValue('cmbEnvironment');
        
        if (this.getValue('cmbtTypeProcessCalc') === null) {
            global.Msg({ msg: 'Selected Proccess' });
            return false;
        } else {
            this.beanSQP01597.A3012APCUR = this.getValue('cmbtTypeProcessCalc');
            if (this.getValue('cmbtTypeProcessCalc') === 'C') {
                this.beanSQP01597.A3012APCURN="";
                this.beanSQP01597.A3012COLOR="";
            } else {
                if (this.getValue('cmbForma') === null) {
                    global.Msg({ msg: 'Selected Forma Proccess' });
                } else {
                    this.beanSQP01597.A3012APCURN= this.getValue('cmbForma');
                    if(this.getValue('cmbtTypeProcessCalc')!=='M'){
                        this.beanSQP01597.A3012COLOR=this.getValue('txtCodigoForma');
                    } else{
                        this.beanSQP01597.A3012COLOR='';
                    }
                }
            }
        }
        if (this.getValue('cmbDateFromYear') === null) {
            global.Msg({ msg: 'Selected Year' });
            return false;
        } else {
            this.beanSQP01597.A3012CURCO=this.getValue('cmbDateFromYear');
        }
        if (this.getValue('cmbtypeperiod') === null) {
            global.Msg({ msg: 'Selected Type Period' });
            return false;
        } else {
            this.beanSQP01597.A3012CUROR = this.getValue('cmbtypeperiod');
        }
        if (this.getValue('cmbPeriod') === null) {
            global.Msg({ msg: 'Selected Period' });
            return false;
        } else {
            this.beanSQP01597.A3012DESCI = this.getValue('cmbPeriod');
        }
	
        if (this.getValue('cmbtTypeProcessCalc') === 'C') {
            this.beanSQP01597.A3012DESCR='';
            this.beanSQP01597.A3012ERREX='';
            this.beanSQP01597.A3012CDESQ = '1';
        } else {
            if (this.getValue('cmbPais') === null) {
                global.Msg({ msg: 'Selected Country' });
                return false;
            }
            this.beanSQP01597.A3012DESCR= this.getValue('cmbPais');
	    
            this.beanSQP01597.A3012ERREX= this.FF;
            this.beanSQP01597.A3012CDESQ = '0';
        }
        
	Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: 'Really want to process?',
            buttons: Ext.MessageBox.OKCANCEL,
            scope: this,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function(btn) {
                if (btn === 'ok') {
                    this.setProccess(this.beanSQP01597);
                }
            }
        });
    },
    // </editor-fold>
    
    // <editor-fold defaultstate="collapsed" desc="setProccess">
    setProccess: function(beanSQP01597) {
        Ext.Ajax.request({
            url: prototype.url+'/setProccess',
            method: 'POST',
            timeout: 60000000,
            params: beanSQP01597,
//            beforerequest: Ext.getCmp('DataEntry').mask('Loading...'),
            success: function(response, options){
                var res = Ext.JSON.decode(response.responseText);
                if (res.success) {
                    var lstArray = res.response;
                    var objA1155 = lstArray[0];
                    
                    Ext.Msg.show({
                        title: '.:PRAXIS:.',
                        msg: objA1155.OU_MESSAGE,
                        buttons: Ext.MessageBox.OK,
                        scope: this,
                        icon: Ext.MessageBox.INFO,
                        modal: true,
                        fn: function(btn) {
                            if (btn === 'ok') {
                                me.getCheckList();
                            }
                        }
                    });
                } else global.Msg({ msg: res.sesion });
//                Ext.getCmp('DataEntry').unmask();
            },
            failure: function(response, opts) {
                console.log('server-side failure with status code '+response.status);
//                Ext.getCmp('DataEntry').unmask();
            }
        });
    },
    // </editor-fold>
    btnInsert_clickHandler: function() {
        var beanOption = {};
        var msn='Are you sure to insert?';
        this.llenarData(beanOption);
        if(this.set_validate_data(beanOption)){
            if(this.actionCode==='U'){
                msn='Are you sure to update?';
            } else {
                this.bean=this.beanOption;
            }
            Ext.Msg.show({
                title: '.:PRAXIS:.',
                msg: msn,
                buttons: Ext.MessageBox.OKCANCEL,
                scope: this,
                icon: Ext.MessageBox.QUESTION,
                modal: true,
                fn: function(btn) {
                    if (btn === 'ok') {
                        beanOption.VP_ACTION = this.actionCode;
                        this.setA1155(beanOption);
                    }
                }
            });
        }
    },
    // <editor-fold defaultstate="collapsed" desc="setA1155">
    setA1155: function(beanOption) {
        Ext.Ajax.request({
            url: prototype.url+'/setA1155',
            method: 'POST',
            timeout: 60000000,
            params: beanOption,
//            beforerequest: Ext.getCmp('DataEntry').mask('Loading...'),
            success: function(response, options){
                var res = Ext.JSON.decode(response.responseText);
                if (res.success) {
                    var lstArray = res.response;
                    var objA1155 = lstArray[0];
                    
                    Ext.Msg.show({
                        title: '.:PRAXIS:.',
                        msg: objA1155.OU_MESSAGE,
                        buttons: Ext.MessageBox.OK,
                        scope: this,
                        icon: Ext.MessageBox.INFO,
                        modal: true,
                        fn: function(btn) {
                            if (btn === 'ok') {
                                if(me.actionCode==='I' || me.actionCode==='U'){
                                    if(me.actionCode==='I'){
                                        me.actionCode='U';
                                        me.bean.A1155FINI  = me.getValue('txtA1155FINI');
                                        me.bean.A1155FFIN  = me.getValue('txtA1155FFIN');
                                        me.bean.A1155FRECE = me.getValue('txtA1155FRECE');

                                        me.setValue('textA1155CODAC', objA1155.IN_SELET_CODE);
                                        me.setValue('textA1155VRSAC', objA1155.IN_SELET_SERIE);
                                        me.bean.A1155CODAC=objA1155.IN_SELET_CODE;
                                        me.bean.A1155VRSAC=objA1155.IN_SELET_SERIE;
                                        me.init2();
                                    }
                                }else{
                                    me.btnCancel_clickHandler();
                                }
                            }
                        }
                    });
                } else global.Msg({ msg: res.sesion });
//                Ext.getCmp('DataEntry').unmask();
            },
            failure: function(response, opts) {
                console.log('server-side failure with status code '+response.status);
//                Ext.getCmp('DataEntry').unmask();
            }
        });
    },
    // </editor-fold>
    setResetNewVersion: function() {
        this.setValue('textA1155VRSAC', '');
        this.bean.A1155VRSAC='';
	this.bean.A1155FFIN='';
	this.bean.A1155FINI='';
	this.bean.A1155FESTA='R';
	this.bean.A1155FRECE='';
        this.TBTW=false;
	this.TBTW=false;
	this.TBTR=false;
        this.init2();
        this.actionCode='I';
    },
    btnDelete_clickHandler: function() {
        var beanOption = {};
        this.llenarData(beanOption);
        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: 'Are you sure to delete?',
            buttons: Ext.MessageBox.OKCANCEL,
            scope: this,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function(btn) {
                if (btn === 'ok') {
                    this.actionCode='D';
                    beanOption.VP_ACTION = 'D';
                    this.setA1155(beanOption);
                }
            }
        });
    },
    getChangePeriod: function() {
        var T = this.getValue('cmbtypeperiod');
        Ext.getCmp(prototype.id+'-cmbPeriod').bindStore(
            Ext.create('Ext.data.ArrayStore', {
                storeId: 'new', autoLoad: true, data: new Array(), fields: ['code', 'name']
            })
        );
        switch (T) {
            case 'Q':
                Ext.getCmp(prototype.id + '-cmbPeriod').bindStore(this.TRIMESTRAL);
                break;
            case 'S':
                Ext.getCmp(prototype.id + '-cmbPeriod').bindStore(this.SEMESTRE);
                break;
            case 'M':
                Ext.getCmp(prototype.id + '-cmbPeriod').bindStore(this.MENSUAL);
                break;
            case 'B':
                Ext.getCmp(prototype.id + '-cmbPeriod').bindStore(this.BIMESTRAL);
                break;
        }
    },
    // <editor-fold defaultstate="collapsed" desc="llenarData">
    llenarData: function(beanOption) {
        var code = this.getValue('textA1155CODAC');
        beanOption.A1155AIRLI='139';
	beanOption.TITLE=this.getValue('textNameScheme');
	beanOption.A1155CIA1=code.substr(0,3);
	beanOption.A1155CIA2=code.substr(3,6);
	beanOption.A1155CNUM=code.substr(0,3);
	beanOption.A1155FNUM=code.substr(3,6);
	beanOption.A1155CODAC = code;
	beanOption.A1155INDAC='U';
	beanOption.A1155VRSAC = this.getValue('textA1155VRSAC');
	beanOption.A1155FLGAD = this.getValue('CHKA1155FLGAD')?'A':'';
	beanOption.A1155FINI  = Ext.util.Format.date(Ext.getCmp(prototype.id+'-txtA1155FINI').getValue(), 'Ymd');
	beanOption.A1155FFIN  = Ext.util.Format.date(Ext.getCmp(prototype.id+'-txtA1155FFIN').getValue(), 'Ymd');
	beanOption.A1155FLGFE = this.getValue('cmbA1155FLGFE');
	beanOption.A1155FLGAU = this.getValue('CHKA1155FLGAU')?'S':'N';
	beanOption.A1155FESTA = this.getValue('cmbA1155FESTA');
	beanOption.A1155INDIC='T';
	beanOption.A1155MPA='N';
	beanOption.A1155SRP='N';
	beanOption.A1155PRO='N';
	beanOption.A1155TRAMO='N';
	beanOption.A1155DEFAU='';
	beanOption.A1155PDEFA='0';
	
	beanOption.A1155IDSCO =this.getValue('RBDA1155IDSCO')?'Y':'N';
	beanOption.A1155PDEFA =this.getValue('txtA1155PDEFA')!==''?this.getValue('txtA1155PDEFA'):'0.00';//RBDA1155IDSCO.selected?txtA1155PDEFA.text:'0.00';
	beanOption.A1155PISC  = '0';//textA1155PISC.text==''?'0':textA1155PISC.text;
	beanOption.A1155FRECE = Ext.util.Format.date(Ext.getCmp(prototype.id+'-txtA1155FRECE').getValue(), 'Ymd');
	beanOption.A1155CIAFM='';
	beanOption.A1155FNAME='';
	beanOption.A1155CODSP='';
	beanOption.A1155CORRE='';
	beanOption.A1155ESTAD='N';
    },
    // </editor-fold>
    set_validate_data: function(beanOption) {
        var vl_flag = true;
        if ( beanOption.A1155FINI === ''){
            global.Msg({ msg: 'Enter, Effective Date Open' });
            this.focus('txtA1155FINI');
            vl_flag = false;
        }
        return vl_flag;
    },
    getStatusList: function() {
        this.setClearDataColumn();
        this.beanSQP01723.VP_AIRLI= this.bean.A1155AIRLI;
        this.beanSQP01723.VP_CODAC=this.bean.A1155CODAC;
        this.beanSQP01723.VP_INDAC=this.bean.A1155INDAC;
        this.beanSQP01723.VP_VRSAC=this.bean.A1155VRSAC;
        
        if (this.getValue('cmbtTypeProcessCalc') === null) {
            return false;
        } else {
            this.beanSQP01723.VP_TPC = this.getValue('cmbtTypeProcessCalc');
        }
        if (this.getValue('cmbDateFromYear') === null) {
            return false;
        } else {
            this.beanSQP01723.VP_YEAR = this.getValue('cmbDateFromYear');
        }
        if (this.getValue('cmbtypeperiod') === null) {
            return false;
        } else {
            this.beanSQP01723.VP_TPERI = this.getValue('cmbtypeperiod');
        }
        if (this.getValue('cmbPeriod') === null) {
            return false;
        } else {
            this.beanSQP01723.VP_PERIO = this.getValue('cmbPeriod');
        }
        this.beanSQP01723.VP_ENV=this.getValue('cmbEnvironment');
        this.beanSQP01597.VP_CDESQ = "1";
        
        this.getStatusListM(this.beanSQP01723);
    },
    getStatusListM: function (beanSQP01723) {
        var storeGridDatas = Ext.create('Ext.Praxis.store.sales.InputSchemeUpfront.GridDataStatusList', {
            proxy: {
                url: prototype.url+'/getStatusList'
            },
            listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = beanSQP01723;
                },
                load: function(obj, obj2, success, obj4, obj5) {
                    global.clear();
                }
            }
        });
        Ext.getCmp(prototype.id+'-gridMSN').bindStore(storeGridDatas);
    },
    setClearDataColumn: function() {
        this.beanSQP01597.VP_ACTION='';
	this.beanSQP01597.A3012KEYCL ='';
	this.beanSQP01597.A3012ORDER='';
	this.beanSQP01597.A3012ORDRR='';
	this.beanSQP01597.A3012TVAR ='';
	this.beanSQP01597.A3012VAR ='';
	this.beanSQP01597.A3012NAME='';
	this.beanSQP01597.A3012SOURC ='';
	this.beanSQP01597.A3012TYPE='';
	this.beanSQP01597.A3012DESCI='';
	this.beanSQP01597.A3012DESCR ='';
	this.beanSQP01597.A3012EXPRE ='';
	this.beanSQP01597.A3012SEXPR ='';
	this.beanSQP01597.A3012WIDTH ='';
	this.beanSQP01597.A3012COLOR ='';
	this.beanSQP01597.A3012VISIB ='';
	this.beanSQP01597.A3012APCUR ='';
	this.beanSQP01597.A3012CUROR ='';
	this.beanSQP01597.A3012CURCO='';
	this.beanSQP01597.A3012VALEX ='';
	this.beanSQP01597.A3012ERREX='';
	this.beanSQP01597.A3012STAT ='';
    },
    // <editor-fold defaultstate="collapsed" desc="getListCountry">
    getListCountry: function() {
        Ext.Ajax.request({
            url: prototype.url+'/getListCountry',
            method: 'POST',
            timeout: 60000000,
            beforerequest: Ext.getCmp(prototype.id + '-cmbPais').mask(),
            success: function(response, options){
                var res = Ext.JSON.decode(response.responseText);
                if (res.success) {
                    var listaPaises = res.listaPaises;
                    var paises = new Array();
                    listaPaises.forEach(function callback(currentValue, index, array) {
                        paises.push([currentValue.A051KEY2, currentValue.A051KEY2 + ' - ' + currentValue.A051DESCR1]);
                    });
                    var store = Ext.create('Ext.data.ArrayStore', {
                        storeId: 'paises', autoLoad: true, data: paises, fields: ['code', 'name']
                    });
                    Ext.getCmp(prototype.id+'-cmbPais').bindStore(store);
                    me.setValue('cmbPais', 'MX');
                } else global.Msg({ msg: res.sesion });
                Ext.getCmp(prototype.id + '-cmbPais').unmask();
            },
            failure: function(response, opts) {
                console.log('server-side failure with status code '+response.status);
                Ext.getCmp(prototype.id + '-cmbPais').unmask();
            }
        });
    },
    // </editor-fold>
    getSQP01090: function(table) {
        this.beanSQP01090.A1172AIRLI=this.bean.A1155AIRLI;
	this.beanSQP01090.A1172CODAC=this.bean.A1155CODAC;
	this.beanSQP01090.A1172INDAC=this.bean.A1155INDAC;
	this.beanSQP01090.A1172VRSAC=this.bean.A1155VRSAC;
	this.beanSQP01090.A1172FAMIL=table;
        this.getSQP01090M(this.beanSQP01090);
    },
    // <editor-fold defaultstate="collapsed" desc="getSQP01090M">
    getSQP01090M: function(beanSQP01090) {
        Ext.Ajax.request({
            url: prototype.url+'/getSQP01090',
            method: 'POST',
            timeout: 60000000,
            params: beanSQP01090,
            beforerequest: Ext.getCmp(prototype.id + '-boxAuxiliaryTable').mask('Loading...'),
            success: function(response, options){
                var res = Ext.JSON.decode(response.responseText);
                if (res.success) {
                    var lstSQP01090 = res.lstSQP01090;
                    var lstSQP01093 = res.lstSQP01093;
                    var lstSQP01094 = res.lstSQP01094;
                    var lstSQP01095 = res.lstSQP01095;
                    Ext.getCmp(prototype.id+'-gridAuxiliaryTable').mask('Loading...');
                    var storeGridData = Ext.create('Ext.Praxis.store.sales.InputSchemeUpfront.GridDataAuxiliaryTable', { data: lstSQP01090 });
                    Ext.getCmp(prototype.id + '-gridAuxiliaryTable').bindStore(storeGridData);
                    Ext.getCmp(prototype.id+'-gridAuxiliaryTable').unmask();
                    
                    me.setValue('cmbIndicador', null);
                    // <editor-fold defaultstate="collapsed" desc="onResultSQP01093">
                    var index = me.getValue('cmbsearch2');
                    var arreglo = new Array();
                    arreglo.push(['', 'Select']);
                    lstSQP01093.forEach(function callback(currentValue, index, array) {
                        arreglo.push([currentValue.A1172FAMIL, currentValue.A1172FAMIL]);
                    });
                    var store = Ext.create('Ext.data.ArrayStore', {
                        storeId: 'arreglo', autoLoad: true, data: arreglo, fields: ['code', 'name']
                    });
                    Ext.getCmp(prototype.id+'-cmbTable').bindStore(store);
                    Ext.getCmp(prototype.id+'-cmbsearch2').bindStore(store);
                    me.setValue('cmbsearch2', index);
                    // </editor-fold>
                    
                    // <editor-fold defaultstate="collapsed" desc="onResultSQP01094">
                    arreglo = new Array();
                    lstSQP01094.forEach(function callback(currentValue, index, array) {
                        arreglo.push([currentValue.A1172TDATA, currentValue.A1172TDATA]);
                    });
                    var store = Ext.create('Ext.data.ArrayStore', {
                        storeId: 'arreglo2', autoLoad: true, data: arreglo, fields: ['code', 'name']
                    });
                    Ext.getCmp(prototype.id+'-cmbDataType').bindStore(store);
                    me.setValue('cmbDataType', null);
                    // </editor-fold>
                    
                    // <editor-fold defaultstate="collapsed" desc="onResultSQP01095">
                    arreglo = new Array();
                    lstSQP01095.forEach(function callback(currentValue, index, array) {
                        arreglo.push([currentValue.A1172METOD, currentValue.A1172METOD]);
                    });
                    var store = Ext.create('Ext.data.ArrayStore', {
                        storeId: 'arreglo3', autoLoad: true, data: arreglo, fields: ['code', 'name']
                    });
                    Ext.getCmp(prototype.id+'-cmbMethod').bindStore(store);
                    me.setValue('cmbMethod', null);
                    // </editor-fold>
                } else global.Msg({ msg: res.sesion });
                Ext.getCmp(prototype.id + '-boxAuxiliaryTable').unmask();
            },
            failure: function(response, opts) {
                console.log('server-side failure with status code '+response.status);
                Ext.getCmp(prototype.id + '-boxAuxiliaryTable').unmask();
            }
        });
    },
    // </editor-fold>
    getEvetSQP01090: function(cmp, value) {
        var selectedValue = value.TABLEAXU;
        if (selectedValue === "1") {
            Ext.getCmp(prototype.id+'-cmbsearch2').disable(true);
        } else {
            Ext.getCmp(prototype.id+'-cmbsearch2').enable(true);
            this.setValue('cmbsearch2', null);
        }
    },
    handlePayment: function(cmp, value) {
        
    },
    setChangeRoute: function(cmp, value) {
        var selectedValue = value.rbSA;
        switch (selectedValue) {
            case "rbSA2":
                this.FF = "ARC";
                break;
            case "rbSA3":
                this.FF = "BSP";
                break;
            case "rbSA4":
                this.FF = "ASR";
                break;
        }
    },
    setDataInput: function() {
        this.setValue('textNameScheme', this.bean.TITLE);
        this.setValue('textA1155CODAC', this.bean.A1155CODAC);
        this.setValue('textA1155VRSAC', this.bean.A1155VRSAC);
        this.setValue('CHKA1155FLGAD', this.bean.A1155FLGAD==='A'?true:false);
        this.setValue('txtA1155FINI', this.bean.A1155FINI);
        
        if(this.bean.A1155FFIN===''){
            this.setValue('CHKA1155FFIN', true);
            this.setValue('txtA1155FFIN', '');
            Ext.getCmp(prototype.id+'-txtA1155FFIN').disable(true);
	}else{
            this.setValue('txtA1155FFIN', this.bean.A1155FFIN.trim());
	}
        this.setValue('cmbA1155FLGFE', this.bean.A1155FLGFE);
        this.setValue('cmbA1155FESTA', this.bean.A1155FESTA);
        this.setValue('CHKA1155FLGAU', this.bean.A1155FLGAU==='S'?true:false);
        this.setValue('RBDA1155IDSCO', this.bean.A1155IDSCO==='Y'?true:false);
        this.setValue('txtA1155PDEFA', this.bean.A1155PDEFA);
        this.setValue('txtA1155FRECE', this.bean.A1155FRECE);
        
        this.setValue('textRegister', this.bean.A1155FINGR+' '+this.bean.A1155HINGR);
        this.setValue('textUser', this.bean.A1155UINGR);
        this.setValue('textLastUpdate', this.bean.A1155FMODI+' '+this.bean.A1155HMODI);
        this.setValue('textLastUser', this.bean.A1155UMODI);
        this.setValue('textCertified', '');
        this.setValue('textCertifiedUser', '');
        this.getResetDataInit();
    },
    getResetData: function() {
        if (this.getValue('search1')) {
            this.getSQP01090('');
        } else {
            this.getSQP01090(this.getValue('cmbsearch2'));
        }
    },
    
    getListViewCCode: function() {
        var P = {};
        P.A1172AIRLI=this.bean.A1155AIRLI;
        P.A1172CODAC=this.bean.A1155CODAC;
        P.A1172INDAC='U';
        P.A1172VRSAC=this.bean.A1155VRSAC;
        this.getListViewCCodeM(P);
    },
    // <editor-fold defaultstate="collapsed" desc="getListViewCCode">
    getListViewCCodeM: function (P) {
        Ext.Ajax.request({
            url: prototype.url+'/getListViewCCode',
            method: 'POST',
            timeout: 60000000,
            params: P,
            beforerequest: function () {
                Ext.getCmp(prototype.id+'-gridGlobalLogic4').mask('Loading...');
                Ext.getCmp(prototype.id+'-gridGlobalLogic5').mask('Loading...');
            },
            success: function(response, options){
                var res = Ext.JSON.decode(response.responseText);
                if (res.success) {
                    var response = res.response;
                    var storeGridData = Ext.create('Ext.Praxis.store.sales.InputSchemeUpfront.GridDataListViewCCode', {
                        data: response
                    });
                    Ext.getCmp(prototype.id+'-gridGlobalLogic4').bindStore(storeGridData);
                    var response2 = res.response2;
                    storeGridData = Ext.create('Ext.Praxis.store.sales.InputSchemeUpfront.GridDataListViewCCode', {
                        data: response2
                    });
                    Ext.getCmp(prototype.id+'-gridGlobalLogic5').bindStore(storeGridData);
                } else global.Msg({ msg: res.sesion });
                Ext.getCmp(prototype.id+'-gridGlobalLogic4').unmask();
                Ext.getCmp(prototype.id+'-gridGlobalLogic5').unmask();
            },
            failure: function(response, opts) {
                console.log('server-side failure with status code '+response.status);
                Ext.getCmp(prototype.id+'-gridGlobalLogic4').unmask();
                Ext.getCmp(prototype.id+'-gridGlobalLogic5').unmask();
            }
        });
    },
    // </editor-fold>
    initMainTab: function() {
        var tabPanel = Ext.getCmp(prototype.id+'-TabMaster');
        var items = tabPanel.items.items;
        for (var i = 0; i < items.length; i++) items[i].tab.show();
        this.focus('btn7');
    },
    
    // <editor-fold defaultstate="collapsed" desc="Utilitarios">
    getValue: function(id) {
        return Ext.getCmp(prototype.id+'-'+id).getValue();
    },
    focus: function(id) {
        Ext.getCmp(prototype.id+'-'+id).focus();
    },
    setValue: function(id, txt) {
        Ext.getCmp(prototype.id+'-'+id).setValue(txt);
    },
    onUpperValue: function(field, newValue, oldValue){
        field.setValue(newValue.toUpperCase());
    },
    onTextKeypress: function( obj , e , eOpts){
        if ( e.getKey() === e.ENTER ){
            this.btnSearch_click();
        }
    }
    // </editor-fold>
});