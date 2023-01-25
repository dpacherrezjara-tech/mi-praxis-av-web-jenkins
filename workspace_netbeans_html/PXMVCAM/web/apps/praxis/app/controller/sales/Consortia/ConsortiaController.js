/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.controller.sales.Consortia.ConsortiaController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ConsortiaController',
    fecha: new Date(),
    paginActual: '',
    drillDown: [],
    gridActual: '',
    me: '',
    searchParams: {},
    paramsDetail: {},
    init: function(view) {
        prototype.id = 'ConsortiaForm';
        prototype.url = CONTEXTPATH + '/Consortia';
        me = this;
        this.control({
            // -------------------Eventos Genericos --------------------
            '#ConsortiaForm-xpanel': {
                afterrender: this.xpanel_afterrender
            },
            '#ConsortiaForm-btnSearch': {
                click: this.btnSearch_click
            },
            '#ConsortiaForm-btnClear': {
                click: this.btnClear_click
            },
            '#ConsortiaForm-btnExcel': {
                click: this.btnExcel_click
            },
            '#ConsortiaForm-btnFilter': {
                click: this.btnFilter_click
            },
            '#ConsortiaForm-btnBack': {
                click: this.btnBack_click
            },
            '#ConsortiaForm-btn-pag-first': {
                click: this.pagFirst
            },
            '#ConsortiaForm-btn-pag-previous': {
                click: this.pagPrevious
            },
            '#ConsortiaForm-btn-pag-next': {
                click: this.pagNext
            },
            '#ConsortiaForm-btn-pag-last': {
                click: this.pagLast
            },
            //-----------------Eventos Especificos -------------------            
            '#ConsortiaForm-cmbDate': {
                change: this.onChangeSearch
            },
            '#ConsortiaForm-txtIata': {
                keyup: this.eventKey,
                change: this.onUpperValue
            },
            '#ConsortiaForm-txtIata_02': {
                keyup: this.eventKey,
                change: this.onUpperValue
            },
            '#ConsortiaForm-txtLote': {
                keyup: this.eventKey,
                change: this.onUpperValue
            }
        });
    },
    xpanel_afterrender: function(obj, e) {
        this.hideComponent();
        this.setStoreData();
        this.btnSearch_click();
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
        Ext.getCmp(prototype.id + '-txtA2444FFIN_01').hide();
        Ext.getCmp(prototype.id + '-txtA2444FFIN_02').hide();
        Ext.getCmp(prototype.id + '-cbmStatus').hide();
        Ext.getCmp(prototype.id + '-btnDonwloadText').hide();
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
                break;
            case '2':
                this.hideComponent();
                Ext.getCmp(prototype.id + '-txtLote').show();
                Ext.getCmp(prototype.id + '-cbmStatus').show();
                Ext.getCmp(prototype.id + '-btnDonwloadText').show();
                break;
            case '3':
                this.hideComponent();
                Ext.getCmp(prototype.id + '-txtA2444FFIN_01').show();
                Ext.getCmp(prototype.id + '-txtA2444FFIN_02').show();
                Ext.getCmp(prototype.id + '-txtIata_02').show();
                break;
            default :
                this.hideComponent();
                break;
        }
    },
    btnSearch_click: function(obj, e) {
        this.setFormatParameter();
        console.log(searchParams);
        var opt = Ext.getCmp(prototype.id + '-cmbDate').getValue();
        console.log(opt);
        if (opt === '3') {
            if (searchParams.IN_A2444FINI === '' || searchParams.IN_A2444FINI2 === '') {
                global.Msg({
                    msg: 'Required field Open Date (From/To)","PRAXIS'
                });
                return;
            }
        }
        this.setGridData(obj, e);

    },
    setFormatParameter: function() {
        var IN_A2444CCUST = '139';
        var IN_A2444IATA = '';
        var IN_A2444LOTE = '';
        var IN_A2444FINI = '';
        var IN_A2444FINI2 = '';
        var A2444STAT = '';
        var opt = Ext.getCmp(prototype.id + '-cmbDate').getValue();
        switch (opt) {
            case '1':
                IN_A2444IATA = Ext.getCmp(prototype.id + '-txtIata').getValue();
                break;
            case '2':
                IN_A2444LOTE = Ext.getCmp(prototype.id + '-txtLote').getValue();
                A2444STAT = Ext.getCmp(prototype.id + '-cbmStatus').getValue();
                break;
            case '3':
                IN_A2444FINI = Ext.util.Format.date(Ext.getCmp(prototype.id + '-txtA2444FFIN_01').getValue(), 'Ymd');
                IN_A2444FINI2 = Ext.util.Format.date(Ext.getCmp(prototype.id + '-txtA2444FFIN_02').getValue(), 'Ymd');
                IN_A2444IATA = Ext.getCmp(prototype.id + '-txtIata_02').getValue();
                break;
        }

        searchParams = {
            IN_A2444CCUST: IN_A2444CCUST,
            IN_A2444IATA: IN_A2444IATA,
            IN_A2444LOTE: IN_A2444LOTE,
            IN_A2444FINI: IN_A2444FINI,
            IN_A2444FINI2: IN_A2444FINI2,
            A2444STAT: A2444STAT
        };

    },
    setGridData: function(obj, val) {
        var storeGridDatas = Ext.create('Ext.Praxis.store.sales.Consortia.GridData', {
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
//    btnAdd_click: function() {
//        this.winDataEntry('I');
//    },
//    onEditClick: function(grid, rowIndex, colIndex) {
//        var rec = grid.getStore().getAt(rowIndex);
//        this.winDataEntry('U', rec);
//    },
//    winDataEntry: function(action, rec) {
//        action = action === null || action === undefined ? 'U' : action;
//        rec = rec === null || rec === undefined ? {} : rec;
//        Ext.create('Ext.Praxis.view.sales.ConsortiaForm.DataEntry', {
//            id: prototype.id + '-DataEntryConsortiaForm',
//            params: {
//                action: action,
//                rec: rec
//            }
//        }).show();
//    },

    onViewDetailClick: function(obj, metaData, rowNum, columnNum, obj2, rowData) {

        var data = rowData.data;
        var dataEntry = Ext.create('Ext.Praxis.view.sales.ConsortiaForm.DataEntry', {
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
        Ext.getCmp(prototype.id + '-txtA2444FFIN_01').setValue('');
        Ext.getCmp(prototype.id + '-txtA2444FFIN_02').setValue('');
        Ext.getCmp(prototype.id + '-cbmStatus').setValue('');
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
        global.getFile(prototype.url + '/getXLSX?IN_A2444CCUST=' + searchParams.IN_A2444CCUST
                + '&IN_A2444IATA=' + searchParams.IN_A2444IATA
                + '&IN_A2444LOTE=' + searchParams.IN_A2444LOTE
                + '&IN_A2444FINI=' + searchParams.IN_A2444FINI
                + '&IN_A2444FINI2=' + searchParams.IN_A2444FINI2
                + '&A2444STAT=' + searchParams.A2444STAT
                );
    },
    onDowloadFile: function() {
        var Lote = Ext.getCmp(prototype.id + '-txtLote').getValue();
        if (Lote != '') {
            
            var params = {
                IN_OPCION: 1,
                IN_A2445CCUST: '139',
                IN_A2445LOTE: Lote,
                PAGNUM: -1,
                TOTROW: -1,
                TOTPAG: -1,
                PAGROW: -1
            };
            console.log(params);
            /*global.Msg({
                msg: "Data not Found"
            });*/
            Ext.Msg.show({
                title: '.:PRAXIS:.-Confirm Download',
                msg: 'Please Confirm to proceed to download the file to your local machine',
                buttons: Ext.MessageBox.YESNO,
                scope: this,
                icon: Ext.MessageBox.QUESTION,
                modal: true,
                fn: function(btn) {
                    if (btn === 'yes') {
                        global.getFile(prototype.url + '/downloadText/?IN_OPCION=1&IN_A2445CCUST=139&IN_A2445LOTE='+Lote+'&PAGNUM=-1&TOTROW=-1&TOTPAG=-1&PAGROW=-1');
                    }
                }
            });
        } else {
            global.Msg({
                msg: 'Enter Lote'
            });
        }
    },
    btnFilter_click: function(obj) {
        var option = Ext.getCmp(prototype.id + '-contentFilter');
        if (option.isVisible()) {
            option.setVisible(false);
        } else {
            option.setVisible(true);
        }
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
