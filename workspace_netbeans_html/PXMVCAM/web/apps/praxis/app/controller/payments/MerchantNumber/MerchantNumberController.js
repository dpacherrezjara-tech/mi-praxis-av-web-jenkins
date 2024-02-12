/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.controller.payments.MerchantNumber.MerchantNumberController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.MerchantNumberController',
    fecha: new Date(),
    childs: '5',
    bean: '',
    paginActual: '',
    drillDown: [],
    lstCountry: [],
    gridActual: '',
    panelActual: '',
    fileName: '',
    me: '',
    searchParams: {},
    paramsDetail: {},
    dataObtain: {},
    init: function (view) {
        me = this;
        prototype.id = 'MerchantNumberForm';
        prototype.url = CONTEXTPATH + '/MerchantNumber';
        this.childs = Ext.getCmp(prototype.id + '-panelMain').items.items;
        me.panelActual = '-panelGridData';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        this.obtainData();
        //this.cmbFind_changeHandler();

        this.control({
//            //   -------------------Eventos Genericos --------------------
            '#MerchantNumberForm-xpanel': {
                afterrender: this.xpanel_afterrender
            },
            '#MerchantNumberForm-btnSearch': {
                click: this.btnSearch_click
            },
            '#MerchantNumberForm-btnClear': {
                click: this.btnClear_click
            },
            '#MerchantNumberForm-btnExcel': {
                click: this.btnExcel_click
            },
            '#MerchantNumberForm-btnFilter': {
                click: this.btnFilter_click
            },
            '#MerchantNumberForm-btnAdd': {
                click: this.btnAdd_click
            },
            '#MerchantNumberForm-btnBack': {
                click: this.btnBack_click
            },
            '#MerchantNumberForm-btn-pag-first': {
                click: this.pagFirst
            },
            '#MerchantNumberForm-btn-pag-previous': {
                click: this.pagPrevious
            },
            '#MerchantNumberForm-btn-pag-next': {
                click: this.pagNext
            },
            '#MerchantNumberForm-btn-pag-last': {
                click: this.pagLast
            }
//            //-----------------Eventos Especificos -------------------    
//
//
        });
    },
    xpanel_afterrender: function () {
//        this.btnSearch_click();
    },

    eventKey: function (e, eOpts) {
        if (eOpts.getKey() === 13) {
            this.btnSearch_click();
        }
    },
    onUpperValue: function (field, newValue, oldValue) {
        field.setValue(newValue.toUpperCase());
    },
    onChangeCmbType: function (obj, value) {

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

        this.dataObtain.COUNTRY = 2;
        this.dataObtain.BANK = 1;
        this.dataObtain.CARD = 2;           
        
        Ext.Ajax.request({
            url: prototype.urlMaster + '/obtainData',
            method: 'POST',
            timeout: 60000000,
            params: {beanString: JSON.stringify(this.dataObtain)},
            success: function(response, options) {
                var res = Ext.JSON.decode(response.responseText); 
                console.log(res, 'res')
                if (res.success) {
                    
                    me.lstCountry = res.lstCountry;
                    me.lstBank = res.lstBank;
                    Ext.getCmp(prototype.id + '-cmbScarCode').bindStore(
                        Ext.create('Ext.data.Store', {data: res.lstCard, autoLoad: true}));
                    Ext.getCmp(prototype.id + '-cmbScarCode').setValue('');   
                    
                 
                    me.btnSearch_click();
                } else
                    global.Msg({msg: res.sesion});
            }
        });
    },


    setFormatParameter: function () {

        me.bean = {};
        me.bean.IN_CMERCHAN = Ext.getCmp(prototype.id + '-txtCMERCHAN').getValue();
        me.bean.IN_SCARCOD = Ext.getCmp(prototype.id + '-cmbScarCode').getValue();
        me.bean.IN_CTABANK = Ext.getCmp(prototype.id + '-txtCTABANK').getValue();
        
        var beanString = JSON.stringify(me.bean);
        searchParams = {
            bean: me.bean,
            beanString: beanString
        };
        console.log(searchParams, 'searchParams')
        console.log(beanString, 'beanString')
    },
    btnSearch_click: function (obj, e) {
        this.setFormatParameter();
        this.setGridData();
    },
    // <editor-fold defaultstate="collapsed" desc="setGridData">

    setGridData: function () {
        win.lblUser_toolTip("Estructura: MPF109");
        me.panelActual = '-panelGridData';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        me.setWidthPie();
        var msj = this.validateFields();
        if (msj !== '') {
            global.Msg({msg: msj
            });
        } else {
            var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
                proxy: {
                    url: prototype.url + '/search'
                }, listeners: {
                    beforeload: function (obj) {
                        obj.proxy.extraParams = searchParams;
                    },
                    load: function (obj) {
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
            global.clear();
            Ext.getCmp(prototype.id + '-gridDataAirport').bindStore(storeGridDatas);
            Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas);
            console.log(storeGridDatas, 'storeGridDatas')
        }
    },
    // </editor-fold>
    buscarFilter: function (obj, e, eOpts) {
        switch (e.getKey()) {
            case 13:
                if (Ext.getCmp(prototype.id + '-txtCMERCHAN').getValue().length > 0 || Ext.getCmp(prototype.id + '-txtCTABANK').getValue().length > 0 || Ext.getCmp(prototype.id + '-cmbScarCode').getValue().length > 0 ) {
//                    if (Ext.getCmp(prototype.id + '-txtCAGENCY').getValue().length === 7 || Ext.getCmp(prototype.id + '-txtCAGENCY').getValue().length === 8) {
//                        this.btnSearch_click();
//                    } else {
//                        global.Msg({
//                            msg: 'Agency Code must contain 8 characters.'
//                        });
//                    }
                    this.btnSearch_click();
                } else {
                    this.btnSearch_click();
                }

                break;
        }
    },

    validateFields: function () {
        var msj = '';
        var bean = searchParams.bean;

        return msj;
    },
    btnAdd_click: function () {
        this.winDataEntry('I');
    },
    onEditClick: function (grid, rowIndex, colIndex) {
        var rec = grid.getStore().getAt(rowIndex);
        this.winDataEntry('U', rec);
    },
    winDataEntry: function (action, rec) {
        action = action === null || action === undefined ? 'U' : action;
        rec = rec === null || rec === undefined ? {} : rec;

        Ext.create('Ext.Praxis.view.payments.MerchantNumberForm.DataEntry', {
            id: prototype.id + '-dataEntry',
            params: {
                action: action,
                rec: rec,
                lstCountry: me.lstCountry
            }
        }).show();
    },
    btnBack_click: function (obj, e) {

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
    btnClear_click: function (obj, e) {

        Ext.getCmp(prototype.id + '-txtMERCHN').setValue('');
        Ext.getCmp(prototype.id + '-txtRSOCIAL').setValue('');
        Ext.getCmp(prototype.id + '-cmbUNIOPE').setValue('');
        Ext.getCmp(prototype.id + '-cmbSTATUS').setValue('');
        Ext.getCmp(prototype.id + '-cmbCountry').setValue('');
        Ext.getCmp(prototype.id + '-txtCANAL').setValue('');

    },
    btnExcel_click: function (obj, e) {

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
                fn: function (btn) {
                    if (btn === 'ok') {
                        this.exportExcel();
                    }
                }
            });
        }
    },
    exportExcel: function () {

        this.setFormatParameter();
//        console.log(me.panelActual);
        switch (me.panelActual) {
            case  '-panelGridData':
                global.getFile(prototype.url + '/getXLSX?beanString=' + encodeURI(searchParams.beanString));
                break;
            default:
                global.Msg(
                        {msg: 'Under Construction'
                        });
        }

    },
    onDownloadFile: function (obj, metaData, rowNum, columnNum, obj2, rowData) {
        me.paramsDetail.beanString = JSON.stringify(rowData.data);
        me.fileName = rowData.data.A2536NAMEF;
        Ext.Ajax.request({
            url: prototype.url + '/download',
            method: 'POST',
            timeout: 60000000,
            beforerequest: Ext.getCmp(prototype.id + '-gridData').mask('Loading...'),
            params: me.paramsDetail,
            success: function (response, options) {
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
    btnFilter_click: function (obj) {
//        console.log('btnFilter_click');
        var option = Ext.getCmp(prototype.id + '-contentFilter');
        if (option.isVisible()) {
            option.setVisible(false);
        } else {
            option.setVisible(true);
        }
    },
    setWidthPie: function () {
        var ancho = Ext.getCmp(prototype.id + me.panelActual).getWidth();
        Ext.getCmp(prototype.id + '-pie').setWidth(ancho);
    },
    getPaggin: function () {
        me.pagginActual = '';
        switch (me.panelActual) {
            case  '-panelGridData':
                me.pagginActual = '-paggin';
                break;
        }
    },
    /*     
     * Funciones para la paginacion     
     */
    pagFirst: function (obj, e) {
        this.getPaggin();
        var pag = Ext.getCmp(prototype.id + me.pagginActual);
        pag.moveFirst();
    }, pagPrevious: function (obj, e) {
        this.getPaggin();
        var pag = Ext.getCmp(prototype.id + me.pagginActual);
        pag.movePrevious();
    },
    pagNext: function (obj, e) {
        this.getPaggin();
        var pag = Ext.getCmp(prototype.id + me.pagginActual);
        pag.moveNext();
    },
    pagLast: function (obj, e) {
        this.getPaggin();
        var pag = Ext.getCmp(prototype.id + me.pagginActual);
        pag.moveLast();
    },
    getInt: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = 'text-align:right';
        return Ext.util.Format.number(value, '0,000');
    },
    getDouble: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = 'text-align:right';
        return Ext.util.Format.number(value, '0,000.00');
    },
    getText: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = 'text-align:left';
        return value;
    },
    getDoubleColor1: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = 'text-align:right;background:#F2FAFC';
        return Ext.util.Format.number(value, '0,000.00');
    },
    getDoubleColor2: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = 'text-align:right;background:#DFF0ED';
        return Ext.util.Format.number(value, '0,000.00');
    },
    getDoubleColor3: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = 'text-align:right;background:#FCF5F2';
        return Ext.util.Format.number(value, '0,000.00');
    }


}
);