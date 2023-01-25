Ext.define('Ext.Praxis.controller.sales.InputSchemeUpfront.InputSchemeUpfrontController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.InputSchemeUpfrontController',
    _path: '',
    TM: 'U',
    CMPT: false,
    lstFUNCTION: new Array(),
    lstFUNCTIONA: new Array(),
    lstPARAMTG: new Array(),
    lstMONEDA: new Array(),
    me: '',
    setContext: function() {
        me = this;
    },
    init: function(view) {
        me = this;
        prototype.id = 'InputSchemeUpfrontForm';
        prototype.url = CONTEXTPATH+'/InputSchemeUpfront';
        prototype.widthContenedor = 1310;
        prototype.widthGrid = 1291;
    },
    afterRender: function () {
        this.btnSearch_click();
        this.getFunctions();
    },
    onCmbOpcionChange: function(cmp, newValue) {
        this.setValue('txtCode', '');
        this.setValue('txtFechaOpen', '');
        this.setValue('cmbStatus', '');
        switch (newValue) {
            case 'N':
                Ext.getCmp(prototype.id+'-txtCode').show();
                Ext.getCmp(prototype.id+'-txtCode').setWidth(200);
                Ext.getCmp(prototype.id+'-txtCode').inputEl.dom.maxLength=150;
                Ext.getCmp(prototype.id+'-txtFechaOpen').hide();
                Ext.getCmp(prototype.id+'-lblStatus').hide();
                Ext.getCmp(prototype.id+'-cmbStatus').hide();
                this.focus('txtCode');
                break;
            case 'C':
                Ext.getCmp(prototype.id+'-txtCode').show();
                Ext.getCmp(prototype.id+'-txtCode').setWidth(100);
                Ext.getCmp(prototype.id+'-txtCode').inputEl.dom.maxLength=6;
                Ext.getCmp(prototype.id+'-txtFechaOpen').hide();
                Ext.getCmp(prototype.id+'-lblStatus').hide();
                Ext.getCmp(prototype.id+'-cmbStatus').hide();
                this.focus('txtCode');
                break;
            case 'E':case 'S':default:
                Ext.getCmp(prototype.id+'-txtCode').hide();
                Ext.getCmp(prototype.id+'-txtCode').setWidth(0);
                Ext.getCmp(prototype.id+'-txtFechaOpen').show();
//                this.setValue('txtFechaOpen', new Date());
                Ext.getCmp(prototype.id+'-lblStatus').show();
                Ext.getCmp(prototype.id+'-cmbStatus').show();
                this.focus('txtFechaOpen');
                break;
        }
    },
    
    // <editor-fold defaultstate="collapsed" desc="Info">
    onEditClick: function(grid, rowIndex, colIndex) {
        if (this.CMPT) {
            var store = grid.getStore();
            var data = store.getAt(rowIndex).data;
            this.winDataEntry('U', data);
        }
    },
    winDataEntry: function(action, data) {
        action = action === null || action === undefined ? 'U' : action;
        data = data === null || data === undefined ? {} : data;
        Ext.create('Ext.Praxis.view.sales.InputSchemeUpfrontForm.DataEntry', {
            id: 'DataEntryInputSchemeUpfrontForm',
            params: {
                actionCode: action,
                bean: data,
                TM: this.TM,
                lstFUNCTION: this.lstFUNCTION,
                lstFUNCTIONA: this.lstFUNCTIONA,
                lstPARAMTG: this.lstPARAMTG,
                lstMONEDA: this.lstMONEDA
            }
        }).show();
    },
    // </editor-fold>
    
    // <editor-fold defaultstate="collapsed" desc="Options">
    btnSearch_click: function(obj, e) {
        var cmbOpcion = this.getValue('cmbOpcion');
        var txtFechaOpen = Ext.util.Format.date(Ext.getCmp(prototype.id+'-txtFechaOpen').getValue(), 'Ymd');
        switch (cmbOpcion) {
            case 'C':
                if (this.getValue('txtCode')==='') {
                    global.Msg({ msg: 'Enter the required fields.' });
                    return false;
                }
                break;
            case 'E':// case 'S':
                if (txtFechaOpen==='') {
                    global.Msg({ msg: 'Enter the required fields.' });
                    return false;
                } else {
                    var errors = Ext.getCmp(prototype.id+'-txtFechaOpen').getErrors();
                    errors.forEach(function callback(currentValue, index, array) {
                        global.Msg({ msg: currentValue });
                    });
                    if (errors.length > 0) {
                        this.focus('txtFechaOpen');
                        return false;
                    }
                }
                break;
        }
        // <editor-fold defaultstate="collapsed" desc="asignación">
        var bean = {};
        bean.A1155AIRLI="139";
	bean.A1155INDAC=this.TM;
	bean.A1155CODAC='';
	bean.A1155VRSAC='';
	bean.A1155FINI='';
	bean.A1155FESTA='';
	bean.A1155FINGR='';
	bean.TITLE='';
        switch (cmbOpcion) {
            case 'N':
                bean.TITLE=this.getValue('txtCode');
                break;
            case 'C':
                bean.A1155CODAC=this.getValue('txtCode');
                break;
            case 'E':
                bean.A1155FINI=txtFechaOpen;
                bean.A1155FESTA=this.getValue('cmbStatus');
                break;
            case 'S':
                bean.A1155FINGR=txtFechaOpen;
                bean.A1155FESTA=this.getValue('cmbStatus');
                break;
        }
        _path = prototype.url+'/getXLSX?' +
            'A1155AIRLI='+bean.A1155AIRLI+'&' +
            'A1155CODAC='+bean.A1155CODAC+'&' +
            'A1155INDAC='+bean.A1155INDAC+'&' +
            'A1155VRSAC='+bean.A1155VRSAC+'&' +
            'A1155FESTA='+bean.A1155FESTA+'&' +
            'A1155FINI='+bean.A1155FINI+'&' +
            'A1155FINGR='+bean.A1155FINGR+'&' +
            'TITLE='+bean.TITLE;
        // </editor-fold>
        this.search(bean);
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
    btnAdd_click: function() {
        this.winDataEntry('I');
    },
    btnBack_click: function() {
        if (Ext.getCmp(prototype.id+'-boxMainData').isVisible()) {
            global.showMenu();
        }
    },
    // </editor-fold>
    
    // <editor-fold defaultstate="collapsed" desc="setGridData">
    search: function(bean) {
        var storeGridDatas = Ext.create('Ext.Praxis.store.sales.InputSchemeUpfront.GridData', {
            proxy: {
                url: prototype.url+'/search'
            },
            listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = bean;
                },
                load: function(obj, obj2, success, obj4, obj5) {
                    win.lblUser_toolTip("Estructura: A1155");
                    // <editor-fold defaultstate="collapsed" desc="paggin">
                    var pag = Ext.getCmp(prototype.id+'-paggin');
                    var pagData = pag.getPageData();

                    var currentPage = Ext.util.Format.number(pagData.currentPage, '0,000');
                    var pageCount = Ext.util.Format.number(pagData.pageCount, '0,000');
                    var total = Ext.util.Format.number(pagData.total, '0,000');

                    Ext.getCmp(prototype.id+'-lbl-currentPage').setText(currentPage);
                    Ext.getCmp(prototype.id+'-lbl-pageCount').setText(pageCount);
                    Ext.getCmp(prototype.id+'-lbl-total').setText(total);
                    // </editor-fold>
                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found'
                        });
                    }
                    global.clear();
                }
            }
        });
        Ext.getCmp(prototype.id+'-gridSalesReport').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id+'-paggin').bindStore(storeGridDatas);
    },
    // </editor-fold>
    
    // <editor-fold defaultstate="collapsed" desc="getSQP01096">
    getSQP01096: function() {
        Ext.Ajax.request({
            url: prototype.url+'/getSQP01096',
            method: 'POST',
            timeout: 60000000,
            success: function(response, options){
                var res = Ext.JSON.decode(response.responseText);
                if (res.success) {
                    var lstArray = res.lstSQP01096;
                    me.lstMONEDA = new Array();
                    lstArray.forEach(function callback(currentValue, index, array) {
                        me.lstMONEDA.push([currentValue.A1172EQUIV, currentValue.A1172EQUIV]);
                    });
                } else global.Msg({ msg: res.sesion });
            },
            failure: function(response, opts) {
                console.log('server-side failure with status code '+response.status);
            }
        });
    },
    // </editor-fold>
    
    // <editor-fold defaultstate="collapsed" desc="getFunctionsM">
    getFunctionsM: function(beanCONSOLE_PARANT) {
        var lstArray;
        Ext.Ajax.request({
            url: prototype.url+'/getFunctions',
            method: 'POST',
            timeout: 60000000,
            params: beanCONSOLE_PARANT,
            success: function(response, options){
                var res = Ext.JSON.decode(response.responseText);
                if (res.success) {
                    lstArray = res.lstFUNCTIONA;
                    me.lstFUNCTION = new Array();
                    lstArray.forEach(function callback(beanCS, index, array) {
                        me.lstFUNCTION.push({data : beanCS.CODIGO, label : beanCS.NOMBRE ,NOMBREREAL : beanCS.NOMBREREAL,idpadre : beanCS.CODIGOPADRE,nombrepadre : beanCS.NOMBREPADRE,METHOD:beanCS.FUNCTION,NPARAMT:beanCS.NPARAMT,TVALID:beanCS.TVALID,DRINKID:beanCS.DRINKID,DRINKKEY:beanCS.DRINKKEY});
                    });
                    
                    lstArray = res.lstFUNCTIONB;
                    me.lstFUNCTIONA = new Array();
                    lstArray.forEach(function callback(beanCS, index, array) {
                        me.lstFUNCTIONA.push({data : beanCS.CODIGO, label : beanCS.NOMBRE });
                    });
                    
                    lstArray = res.lstFUNCTIONC;
                    me.lstPARAMTG = new Array();
                    lstArray.forEach(function callback(beanCS, index, array) {
                        me.lstPARAMTG.push({data : beanCS.CODIGO, label : beanCS.NOMBRE,idpadre : beanCS.CODIGOPADRE,nombrepadre : beanCS.NOMBREPADRE,METHOD:beanCS.FUNCTION,NPARAMT:beanCS.NPARAMT,TVALID:beanCS.TVALID,DRINKID:beanCS.DRINKID,POSITION:beanCS.POSITION,DRINKKEY:beanCS.DRINKKEY});
                    });
                    me.CMPT = true;
                } else global.Msg({ msg: res.sesion });
            },
            failure: function(response, opts) {
                console.log('server-side failure with status code '+response.status);
            }
        });
    },
    // </editor-fold>
    
    exportExcel: function() {
        if (Ext.getCmp(prototype.id+'-boxMainData').isVisible()) {
            global.getFile(_path);
        }
    },
    getFunctions: function() {
        this.CMPT = false;
        this.getSQP01096();//LOAD CURRENCY
        var beanCONSOLE_PARANT = {};
        beanCONSOLE_PARANT.VP_TYPE='F';
	beanCONSOLE_PARANT.VP_POSITION='1';
	beanCONSOLE_PARANT.VP_STATUS='1';
	beanCONSOLE_PARANT.VP_INDAC=this.TM;
	beanCONSOLE_PARANT.VP_CODIGO='';
        this.getFunctionsM(beanCONSOLE_PARANT);
    },
    
    // <editor-fold defaultstate="collapsed" desc="Funciones para la paginación">
    pagFirst: function(obj, e) {
        if (Ext.getCmp(prototype.id+'-boxMainData').isVisible()) {
            Ext.getCmp(prototype.id+'-paggin').moveFirst();
        }
    },
    pagPrevious: function(obj, e) {
        if (Ext.getCmp(prototype.id+'-boxMainData').isVisible()) {
            Ext.getCmp(prototype.id+'-paggin').movePrevious();
        }
    },
    pagNext: function(obj, e) {
        if (Ext.getCmp(prototype.id+'-boxMainData').isVisible()) {
            Ext.getCmp(prototype.id+'-paggin').moveNext();
        }
    },
    pagLast: function(obj, e) {
        if (Ext.getCmp(prototype.id+'-boxMainData').isVisible()) {
            Ext.getCmp(prototype.id+'-paggin').moveLast();
        }
    },
    // </editor-fold>
    
    // <editor-fold defaultstate="collapsed" desc="Utilitarios">
    getValue: function(id) {
        return Ext.getCmp(prototype.id+'-'+id).getValue();
    },
    focus: function(id) {
        Ext.getCmp(prototype.id+'-'+id).focus();
    },
    setValue: function(id, txt) {
        return Ext.getCmp(prototype.id+'-'+id).setValue(txt);
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
