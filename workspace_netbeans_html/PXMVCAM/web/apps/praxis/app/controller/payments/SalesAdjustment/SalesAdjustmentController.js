Ext.define('Ext.Praxis.controller.payments.SalesAdjustment.SalesAdjustmentController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.SalesAdjustmentController',
    fecha: new Date(),
    childs: '5',
    bean: '',
    paginActual: '',
    drillDown: [],
    lstCountry:[],
    lstBank:[],
    gridActual: '',
    panelActual: '',
    fileName: '',
    me: '',
    searchParams: {},
    paramsDetail: {},
    beanSettlementTktsDetail: {},
    paramsDetailDetTktSettlement: {},
    dataObtain: {},
    init: function(view) {
        me = this;
        prototype.id = 'SalesAdjustmentForm';
        prototype.url = CONTEXTPATH + '/SalesAdjustment';
        this.childs = Ext.getCmp(prototype.id + '-panelMain').items.items;
        me.panelActual = '-boxAdjustment';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        
        this.control({
//            //   -------------------Eventos Genericos --------------------
            '#SalesAdjustmentForm-xpanel': {
                afterrender: this.xpanel_afterrender            
            },
            '#SalesAdjustmentForm-btnSearch': {
                click: this.btnSearch_click
            },
            '#SalesAdjustmentForm-btnClear': {
                click: this.btnClear_click
            },
            '#SalesAdjustmentForm-btnExcel': {
                click: this.btnExcel_click
            },
            '#SalesAdjustmentForm-btnFilter': {
                click: this.btnFilter_click
            },
            '#SalesAdjustmentForm-btnAdd': {
                click: this.btnAdd_click
            },
            '#SalesAdjustmentForm-btnBack': {
                click: this.btnBack_click
            },
            '#SalesAdjustmentForm-btn-pag-first': {
                click: this.pagFirst
            },
            '#SalesAdjustmentForm-btn-pag-previous': {
                click: this.pagPrevious
            },
            '#SalesAdjustmentForm-btn-pag-next': {
                click: this.pagNext
            },
            '#SalesAdjustmentForm-btn-pag-last': {
                click: this.pagLast
            }
//            //-----------------Eventos Especificos -------------------    
//
//
        });
    },
    xpanel_afterrender: function(obj, e) {
         this.obtainData();
         this.btnSearch_click();
    },
    eventKey: function(e, eOpts) {
        if (eOpts.getKey() === 13) {
            this.btnSearch_click();
        }
    },
    onUpperValue: function(field, newValue, oldValue) {
        field.setValue(newValue.toUpperCase());
    },
    onChangeCmbType: function(obj, value) {

        Ext.getCmp(prototype.id + '-panelFilter1').hide();
        Ext.getCmp(prototype.id + '-panelFilter2').hide();
        Ext.getCmp(prototype.id + '-panelFilter3').hide();
        Ext.getCmp(prototype.id + '-panelFilter4').hide();
        Ext.getCmp(prototype.id + '-panelFilter5').hide();
        Ext.getCmp(prototype.id + '-panelFilter6').hide();
        Ext.getCmp(prototype.id + '-panelFilter7').hide(); 
        Ext.getCmp(prototype.id + '-panelFilter8').hide();

        if (value !== '') {
            Ext.getCmp(prototype.id + '-panelFilter' + value).show();
        }

    },
    obtainData: function () {

        var month = this.fecha.getMonth() + 1;

        if (month < 10) {
            month = '0' + month;
        }

        var storeComboDataYear = win.getStoreYear(false);
        var storeComboDataMonth = win.getStoreMonth(true);
        var storeComboDataDay = win.getStoreDays(true);

        //month = '05';

        Ext.getCmp(prototype.id + '-cmbDateFromYear').bindStore(storeComboDataYear);
        Ext.getCmp(prototype.id + '-cmbDateFromMonth').bindStore(storeComboDataMonth);
        Ext.getCmp(prototype.id + '-cmbDateFromDay').bindStore(storeComboDataDay);

        Ext.getCmp(prototype.id + '-cmbDateFromYear').setValue(this.fecha.getFullYear());
        Ext.getCmp(prototype.id + '-cmbDateFromMonth').setValue('');
        Ext.getCmp(prototype.id + '-cmbDateFromDay').setValue('');


        Ext.getCmp(prototype.id + '-cmbDateToYear').bindStore(storeComboDataYear);
        Ext.getCmp(prototype.id + '-cmbDateToMonth').bindStore(storeComboDataMonth);
        Ext.getCmp(prototype.id + '-cmbDateToDay').bindStore(storeComboDataDay);

        Ext.getCmp(prototype.id + '-cmbDateToYear').setValue(this.fecha.getFullYear());
        Ext.getCmp(prototype.id + '-cmbDateToMonth').setValue('');
        Ext.getCmp(prototype.id + '-cmbDateToDay').setValue('');

        var cmbDateSel = Ext.getCmp(prototype.id + '-cmbDateSel');
        cmbDateSel.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
               // ["PRDA", "Processing Date"],
                ["PAYDATE", "Payment Date"]
            ]
        }));
        cmbDateSel.setValue("PAYDATE");

        var cmbTDOC = Ext.getCmp(prototype.id + '-cmbTDOC');
        cmbTDOC.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["", "All"],
                ["S", "Sales"],
                ["R", "Refund"]
            ]
        }));
        
        var cmbSTRFND = Ext.getCmp(prototype.id + '-cmbSTRFND');
        cmbSTRFND.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["", "All"],
                ["0", "Pending"],
                ["1", "Processed"]
            ]
        }));
        
        Ext.getCmp(prototype.id + '-cmbTDOC').suspendEvents(false);
        Ext.getCmp(prototype.id + '-cmbTDOC').setValue('');
        Ext.getCmp(prototype.id + '-cmbTDOC').resumeEvents();
        
        Ext.getCmp(prototype.id + '-cmbSTRFND').suspendEvents(false);
        Ext.getCmp(prototype.id + '-cmbSTRFND').setValue('');
        Ext.getCmp(prototype.id + '-cmbSTRFND').resumeEvents();
        
        //me.obtainGetAdjustmentCode();
    },
    obtainGetAdjustmentCode: function () {
        Ext.Ajax.request({
            url: prototype.url + '/getAdjustmentCodes',
            method: 'POST',
            timeout: 60000000,
            params: {beanString: JSON.stringify(this.dataObtain)},
            success: function (response, options) {
                var res = Ext.JSON.decode(response.responseText);
                if (res.success) {
                    Ext.getCmp(prototype.id + '-cmbErrorCode').bindStore(
                            Ext.create('Ext.data.Store', {data: res.data, autoLoad: true})
                            );
                    Ext.getCmp(prototype.id + '-cmbErrorCode').setValue('');
                } else
                    global.Msg({msg: res.sesion});
            }
        });
    },
    setFormatParameter: function() {

        me.bean = {};
        me.bean.IN_DATEFROM = Ext.getCmp(prototype.id + '-cmbDateFromYear').getValue() + Ext.getCmp(prototype.id + '-cmbDateFromMonth').getValue() + Ext.getCmp(prototype.id + '-cmbDateFromDay').getValue();
        me.bean.IN_DATETO = Ext.getCmp(prototype.id + '-cmbDateToYear').getValue() + Ext.getCmp(prototype.id + '-cmbDateToMonth').getValue() + Ext.getCmp(prototype.id + '-cmbDateToDay').getValue();
        me.bean.IN_DATE = Ext.getCmp(prototype.id + '-cmbDateSel').getValue();
        me.bean.IN_CERROR = Ext.getCmp(prototype.id + '-cmbErrorCode').getValue();
        me.bean.IN_PNR = Ext.getCmp(prototype.id + '-txtPNR').getValue();
        me.bean.IN_TDOC = Ext.getCmp(prototype.id + '-cmbTDOC').getValue();
        me.bean.IN_SCARDN1 = Ext.getCmp(prototype.id + '-txtCC1').getValue();
        me.bean.IN_SCARDN2 = Ext.getCmp(prototype.id + '-txtCC2').getValue();
        me.bean.IN_SAUTHOC = Ext.getCmp(prototype.id + '-txtAuth').getValue();
        me.bean.IN_STRFND = Ext.getCmp(prototype.id + '-cmbSTRFND').getValue();
        
        var beanString = JSON.stringify(me.bean);
        
        searchParams = {
            bean: me.bean,
            beanString: beanString
        };
      console.log(searchParams);
    },
    btnSearch_click: function(obj, e) {
        this.setFormatParameter();
        this.setGridData();
    },
    // <editor-fold defaultstate="collapsed" desc="setGridData">

    setGridData: function() {
        win.lblUser_toolTip("Estructura: A2281");
        me.panelActual = '-boxAdjustment';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        me.setWidthPie();
        var msj = this.validateFields();
        if (msj !== '') {
            global.Msg({msg: msj
            });
        } else {
            var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
                proxy: {
                    url: prototype.url + '/searchAdjustment'
                }, listeners: {
                    beforeload: function(obj) {
                        obj.proxy.extraParams =searchParams                                       
                        Ext.getCmp(prototype.id + '-boxAdjustment').mask('Loading...');
                    },
                    load: function(obj) {
                        Ext.getCmp(prototype.id + '-boxAdjustment').unmask();
//                        console.log(obj.data);
                        var pag = Ext.getCmp(prototype.id + '-paggin');
                        var pagData = pag.getPageData();
                        Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
                        Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
                        Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));
                        if (obj.data.length === 0) {
                            global.Msg({
                                msg: 'Data not found.'
                            });
                        }
                    }
                }
            });
            
//            console.log(storeGridDatas);
            global.clear();
            Ext.getCmp(prototype.id + '-gridAdjustment').bindStore(storeGridDatas);
            Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas);
        }
    },
    // </editor-fold>
    onTktsDetail: function (obj, metaData, rowNum, columnNum, obj2, rowData) {
        if (rowData.data.QTYTKT === 0) {
            return
        }
        me.drillDown.push(me.panelActual);
        me.panelActual = '-boxDetailTktSettlement';
        global.selectedChild(me.childs, prototype.id + me.panelActual);

        this.beanSettlementTktsDetail.DATE = rowData.data.DATE;
        this.beanSettlementTktsDetail.IN_DATE = rowData.data.IN_DATE;
        this.beanSettlementTktsDetail.MERCHID = rowData.data.MERCHID;
        this.beanSettlementTktsDetail.SPNR = rowData.data.SPNR;
        this.beanSettlementTktsDetail.ISREFNBR = rowData.data.ISREFNBR;
        this.beanSettlementTktsDetail.IN_PCURRENCY = rowData.data.IN_PCURRENCY;
        this.beanSettlementTktsDetail.IN_TGROSAMOUN = rowData.data.TGROSAMOUN;
        this.beanSettlementTktsDetail.IN_descSTVAL = rowData.data.descSTVAL;
        this.beanSettlementTktsDetail.IN_TRANSDATE = rowData.data.TRANSDATE;
        this.beanSettlementTktsDetail.IN_AXPRODAT = rowData.data.AXPRODAT;
        this.beanSettlementTktsDetail.IN_FREGLA = rowData.data.FREGLA;
        this.beanSettlementTktsDetail.IN_SCARDN = rowData.data.SCARDN;
        this.beanSettlementTktsDetail.IN_SAUTHOC = rowData.data.SAUTHOC;
        this.beanSettlementTktsDetail.IN_IDITEMT = rowData.data.IDITEMT;
        this.beanSettlementTktsDetail.IN_IDITEMS = rowData.data.IDITEMS;

        me.paramsDetailDetTktSettlement.beanString = JSON.stringify(this.beanSettlementTktsDetail);
        this.setGridDataDetTktSettlement();
    },
    setGridDataDetTktSettlement: function () {
        win.lblUser_toolTip("Estructura: A4121");
        me.setWidthPie();
        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/searchDetTktSettlement'
            }, listeners: {
                beforeload: function (obj) {
                    obj.proxy.extraParams = me.paramsDetailDetTktSettlement;
                },
                load: function (obj) {
                    Ext.getCmp(prototype.id + '-contentInfo').unmask();
                    var pag = Ext.getCmp(prototype.id + '-paggin2');
                    var pagData = pag.getPageData();
                    Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
                    Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
                    Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));

                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found.'
                        });
                    } else {
                        console.log(obj);
                        var data = obj.data.items[0].data;
                        console.log(data);
                        Ext.getCmp(prototype.id + '-gridDetailTktSettlement').setTitle('<center style="font-size:12px;">' + 'TICKET: ' + data.IN_ISREFNBR + ' - Currency: ' + ' ' + data.IN_PCURRENCY + ' - ' + data.IN_descSTVAL + '</center>');
                        if (data.IN_DATE === "PAYDATE") {
                            Ext.getCmp(prototype.id + '-detSettTktDate').setText('Payment');
                        } else {
                            Ext.getCmp(prototype.id + '-detSettTktDate').setText('Processing');
                        }
                    }
                }
            }
        });

        global.clear();
        Ext.getCmp(prototype.id + '-gridDetailTktSettlement').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-gridDetailTktSettlement').setStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin2').bindStore(storeGridDatas);
    },

    validateFields: function() {
        var msj = '';
        var bean = searchParams.bean;

        return msj;
    },
    btnAdd_click: function() {
        this.winDataEntry('I');
    },
    onEditClick: function(grid, rowIndex, colIndex) {
        var rec = grid.getStore().getAt(rowIndex);
        var all = grid.getStore();
        this.winDataEntry('U', rec, all, rowIndex);
    },
    winDataEntry: function(action, rec, all, rowIndex) {
        action = action === null || action === undefined ? 'U' : action;
        rec = rec === null || rec === undefined ? {} : rec;       
        
        Ext.create('Ext.Praxis.view.payments.SalesAdjustmentForm.DataEntry', {
            id: prototype.id + '-dataEntry',
            params: {
                action: action,
                rec: rec,
                all: all,
                rowIndex: rowIndex
            }
        }).show();
    },
    btnBack_click: function(obj, e) {

        if (me.drillDown.length > 0) {
            me.panelActual = me.drillDown.pop();
            global.selectedChild(me.childs, prototype.id + me.panelActual);
            me.setWidthPie();

            this.getPaggin();
            if (me.pagginActual !== '') {
                var pag = Ext.getCmp(prototype.id + me.pagginActual);
                var pagData = pag.getPageData();
                Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
                Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
                Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));
            }
        } else {
            global.showMenu();
        }
    },
    btnClear_click: function(obj, e) {
        Ext.getCmp(prototype.id + '-cmbCode').setValue('');
        Ext.getCmp(prototype.id + '-cmbCountry').setValue('');
        Ext.getCmp(prototype.id + '-cmbBank').setValue('');

    },
    btnExcel_click: function(obj, e) {

        this.setFormatParameter();
        var msj = this.validateFields();
        if (msj !== '') {
            global.Msg({msg: msj
            });
        } else {
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
        }
    },
    exportExcel: function() {
        
        this.setFormatParameter();
        switch (me.panelActual) {
            case  '-panelGridData':
                global.getFile(prototype.url + '/getXLSX?beanString=' + searchParams.beanString);
                break;
            default:
                global.Msg(
                        {msg: 'Under Construction'
                        });
        }

    },
    onDownloadFile: function(obj, metaData, rowNum, columnNum, obj2, rowData) {
        me.paramsDetail.beanString = JSON.stringify(rowData.data);
        me.fileName = rowData.data.A2536NAMEF;
        Ext.Ajax.request({
            url: prototype.url + '/download',
            method: 'POST',
            timeout: 60000000,
            beforerequest: Ext.getCmp(prototype.id + '-gridData').mask('Loading...'),
            params: me.paramsDetail,
            success: function(response, options) {
                Ext.getCmp(prototype.id + '-gridData').unmask('Loading...');
                var res = Ext.JSON.decode(response.responseText);

                var resultByte = res.bytes;
                var bytes = new Uint8Array(resultByte); // pass your byte response to this constructor
                var blob = new Blob([bytes], {type: "application/png"});// change resultByte to bytes

                var link = document.createElement('a');
                link.href = window.URL.createObjectURL(blob);
                link.download = me.fileName;
                link.click();
            }
        });

    },
    btnFilter_click: function(obj) {
        var option = Ext.getCmp(prototype.id + '-contentFilter');
        if (option.isVisible()) {
            option.setVisible(false);
        } else {
            option.setVisible(true);
        }
    },
    setWidthPie: function() {
        var ancho = Ext.getCmp(prototype.id + me.panelActual).getWidth();
        Ext.getCmp(prototype.id + '-pie').setWidth(ancho);
    },
    setWidthPie: function () {
        console.log(me.panelActual);
        if (me.panelActual === '-boxAdjustment') {
            var ancho = Ext.getCmp(prototype.id + me.panelActual).getWidth();
            Ext.getCmp(prototype.id + '-pie').setWidth(ancho);
            Ext.getCmp(prototype.id + '-pie').setVisible(true);
        } else {
            Ext.getCmp(prototype.id + '-pie').setVisible(false);
        }
    },
    getPaggin: function () {
        me.pagginActual = '';
        switch (me.panelActual) {
            case  '-boxAdjustment':
                me.pagginActual = '-paggin';
                break;
        }
    },
    /*     
     * Funciones para la paginacion     
     */
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
    getInt: function(value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = 'text-align:right';
        return Ext.util.Format.number(value, '0,000');
    },
    getDouble: function(value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = 'text-align:right';
        return Ext.util.Format.number(value, '0,000.00');
    },
    getText: function(value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = 'text-align:left';
        return value;
    },
    getDoubleColor1: function(value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = 'text-align:right;background:#F2FAFC';
        return Ext.util.Format.number(value, '0,000.00');
    },
    getDoubleColor2: function(value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = 'text-align:right;background:#DFF0ED';
        return Ext.util.Format.number(value, '0,000.00');
    },
    getDoubleColor3: function(value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = 'text-align:right;background:#FCF5F2';
        return Ext.util.Format.number(value, '0,000.00');
    }


  }
);
