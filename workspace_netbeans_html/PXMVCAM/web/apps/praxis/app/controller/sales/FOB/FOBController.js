/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.controller.sales.FOB.FOBController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.FOBController',
    fecha: new Date(),
    paginActual: '',
    drillDown: [],
    gridActual: '',
    me: '',
    searchParams: {},
    searchParams_txt: {},
    paramsDetail: {},
    init: function(view) {
        prototype.id = 'FOBForm';
        prototype.url = CONTEXTPATH + '/FOB';

        me = this;
        this.control({
            // -------------------Eventos Genericos --------------------
            '#FOBForm-xpanel': {
                afterrender: this.xpanel_afterrender
            },
            '#FOBForm-btnSearch': {
                click: this.btnSearch_click
            },
            '#FOBForm-btnClear': {
                click: this.btnClear_click
            },
            '#FOBForm-btnExcel': {
                click: this.btnExcel_click
            },
            '#FOBForm-btnFilter': {
                click: this.btnFilter_click
            },
            '#FOBForm-btnBack': {
                click: this.btnBack_click
            },
            '#FOBForm-btn-download-detail-lote': {
                click: this.img_downloadDetailLote_clickHandler
            },            
//            Navegacion
            '#FOBForm-btn-pag-first': {
                click: this.pagFirst
            },
            '#FOBForm-btn-pag-previous': {
                click: this.pagPrevious
            },
            '#FOBForm-btn-pag-next': {
                click: this.pagNext
            },
            '#FOBForm-btn-pag-last': {
                click: this.pagLast
            },
            //-----------------Eventos Especificos -------------------            
            '#FOBForm-cmbDate': {
                change: this.onChangeSearch
            },
            '#FOBForm-txtIata': {
                keyup: this.eventKey,
                change: this.onUpperValue
            },
            '#FOBForm-txtIata_02': {
                keyup: this.eventKey,
                change: this.onUpperValue
            },
            '#FOBForm-txtLote': {
                keyup: this.eventKey,
                change: this.onUpperValue
            }
        });
    },
    xpanel_afterrender: function(obj, e) {
        this.hideComponent();
        this.setStoreData();
//        //console.log('********************');
//        this.btnSearch_click();
    },
    eventKey: function(e, eOpts) {
        if (eOpts.getKey() === 13) {
            this.btnSearch_click();
        }
    },
    hideComponent: function() {
        Ext.getCmp(prototype.id + '-txtIata').hide();
        Ext.getCmp(prototype.id + '-txtIata_02').hide();
        Ext.getCmp(prototype.id + '-txtLote').hide();
        Ext.getCmp(prototype.id + '-txtA1728FFIN_01').hide();
        Ext.getCmp(prototype.id + '-txtA1728FFIN_02').hide();
        Ext.getCmp(prototype.id + '-cbmStatus').hide();
        Ext.getCmp(prototype.id + '-btn-download-detail-lote').hide(); //new        
    },
    onUpperValue: function(field, newValue, oldValue) {
        field.setValue(newValue.toUpperCase());
    }
    ,
    setStoreData: function() {
        var cmbDate = Ext.getCmp(prototype.id + '-cmbDate');
        cmbDate.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["", "Select"],
                ["1", "IATA"],
                ["2", "ID Lote"],
                ["3", "Open Data"]
            ]
        }));
        cmbDate.setValue("");
        var cbmStatus = Ext.getCmp(prototype.id + '-cbmStatus');
        cbmStatus.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["", "All"],
                ["0", "Pending"],
                ["1", "Automatic send"],
                ["2", "Manual send"]
            ]
        }));
        cbmStatus.setValue("");
    },
    onChangeSearch: function(obj, value) {

        switch (value) {
            case '1':
                this.hideComponent();
                Ext.getCmp(prototype.id + '-txtIata').show();
                Ext.getCmp(prototype.id + '-txtIata').focus();
                break;
            case '2':
                this.hideComponent();
                Ext.getCmp(prototype.id + '-txtLote').show();
                Ext.getCmp(prototype.id + '-cbmStatus').show();
                Ext.getCmp(prototype.id + '-btn-download-detail-lote').show();
                Ext.getCmp(prototype.id + '-txtLote').focus();
                break;
            case '3':
                this.hideComponent();
                Ext.getCmp(prototype.id + '-txtA1728FFIN_01').show();
                Ext.getCmp(prototype.id + '-txtA1728FFIN_02').show();
                Ext.getCmp(prototype.id + '-txtIata_02').show();
                Ext.getCmp(prototype.id + '-txtA1728FFIN_01').focus();
                break;
            default :
                this.hideComponent();
                break;
        }
    },
    btnSearch_click: function(obj, e) {
        this.setFormatParameter();
        //console.log(searchParams);
        var opt = Ext.getCmp(prototype.id + '-cmbDate').getValue();        
        if (opt === '3') {
            if (searchParams.IN_A1728FINI === '' || searchParams.IN_A1728FINI2 === '') {
                global.Msg({
                    msg: 'Required field Open Date (From/To)","PRAXIS'
                });
                return;
            }
        }
        this.setGridData(obj, e);

    },
    setFormatParameter: function(){
        var IN_A1728CCUST = '139';
        var IN_A1728IATA = '';
        var IN_A1728LOTE = '';
        var IN_A1728FINI = '';
        var IN_A1728FINI2 = '';
        var A1728STAT = '';

        var opt = Ext.getCmp(prototype.id + '-cmbDate').getValue();
        switch (opt) {
            case '1':
                IN_A1728IATA = Ext.getCmp(prototype.id + '-txtIata').getValue();
                break;
            case '2':
                IN_A1728LOTE = Ext.getCmp(prototype.id + '-txtLote').getValue();
                A1728STAT = Ext.getCmp(prototype.id + '-cbmStatus').getValue();
                break;
            case '3':
                IN_A1728FINI = Ext.util.Format.date(Ext.getCmp(prototype.id + '-txtA1728FFIN_01').getValue(), 'Ymd');
                IN_A1728FINI2 = Ext.util.Format.date(Ext.getCmp(prototype.id + '-txtA1728FFIN_02').getValue(), 'Ymd');
                IN_A1728IATA = Ext.getCmp(prototype.id + '-txtIata_02').getValue();
                break;
        }

        searchParams = {
            IN_A1728CCUST: IN_A1728CCUST,
            IN_A1728IATA: IN_A1728IATA,
            IN_A1728LOTE: IN_A1728LOTE,
            IN_A1728FINI: IN_A1728FINI,
            IN_A1728FINI2: IN_A1728FINI2,
            A1728STAT: A1728STAT
        };
        searchParams_txt = {
            IN_OPCION:'0',
            IN_A1729CCUST: IN_A1728CCUST,            
            IN_A1729LOTE: IN_A1728LOTE            
        };
        

    },
    setGridData: function(obj, val) {
        //console.log(prototype.url);
        var storeGridDatas = Ext.create('Ext.Praxis.store.sales.FOB.GridData', {
            proxy: {
                url: prototype.url + '/search'
            }, listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = searchParams;
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
                    }
                }
            }
        });
        global.clear();
        Ext.getCmp(prototype.id + '-gridData').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas);
    },

    onViewDetailClick: function(obj, metaData, rowNum, columnNum, obj2, rowData) {

        var data = rowData.data;
        var dataEntry = Ext.create('Ext.Praxis.view.sales.FOBForm.DataEntry', {
            id: prototype.id + '-dataEntry',
            params: {
                rec: data
            }
        });
        dataEntry.setId(prototype.id + "-dataEntry");
        dataEntry.show();

    },
    btnBack_click: function(obj, e) {
        global.showMenu();
    },
    btnClear_click: function(obj, e) {
        Ext.getCmp(prototype.id + '-txtIata').setValue('');
        Ext.getCmp(prototype.id + '-txtIata_02').setValue('');
        Ext.getCmp(prototype.id + '-txtLote').setValue('');
        Ext.getCmp(prototype.id + '-txtA1728FFIN_01').setValue('');
        Ext.getCmp(prototype.id + '-txtA1728FFIN_02').setValue('');
        Ext.getCmp(prototype.id + '-cbmStatus').setValue('');
        Ext.getCmp(prototype.id + '-cmbDate').setValue('');        
        Ext.getCmp(prototype.id + '-gridData').getStore().removeAll();        
        Ext.getCmp(prototype.id + '-cmbDate').focus();
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
        this.setFormatParameter();
        global.getFile(prototype.url + '/getXLSX?IN_A1728CCUST=' + searchParams.IN_A1728CCUST
                + '&IN_A1728IATA=' + searchParams.IN_A1728IATA
                + '&IN_A1728LOTE=' + searchParams.IN_A1728LOTE
                + '&IN_A1728FINI=' + searchParams.IN_A1728FINI
                + '&IN_A1728FINI2=' + searchParams.IN_A1728FINI2
                + '&A1728STAT=' + searchParams.A1728STAT);
    }
    ,
    btnFilter_click: function(obj) {
        var option = Ext.getCmp(prototype.id + '-contentFilter');
        if (option.isVisible()) {
            option.setVisible(false);
        } else {
            option.setVisible(true);
        }
    },
    img_downloadDetailLote_clickHandler:function(){
      //alert('img_downloadDetailLote_clickHandler');      
        this.setFormatParameter();
        //console.log(searchParams_txt);        
         Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: 'Download detail in text?',
            buttons: Ext.MessageBox.OKCANCEL,
            scope: this,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function(btn) {
                if (btn === 'ok') {                    
                    path_URL = '/downloadDetailLoteText?beanString='+encodeURI(JSON.stringify(searchParams_txt));
                    global.getFile(prototype.url + path_URL);                    
                }
            }
        });
    },
    /*     
     * Funciones para la paginacion     
     */
    pagFirst: function(obj, e) {
        var pag = Ext.getCmp(prototype.id + '-paggin');
        var pagData = pag.getPageData();
        pag.moveFirst();
    },
    pagPrevious: function(obj, e) {
        var pag = Ext.getCmp(prototype.id + '-paggin');
        var pagData = pag.getPageData();
        pag.movePrevious();
    },
    pagNext: function(obj, e) {
        var pag = Ext.getCmp(prototype.id + '-paggin');
        var pagData = pag.getPageData();
        pag.moveNext();

    },
    pagLast: function(obj, e) {
        var pag = Ext.getCmp(prototype.id + '-paggin');
        var pagData = pag.getPageData();
        pag.moveLast();
    }



});
