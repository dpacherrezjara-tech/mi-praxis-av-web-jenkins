/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.controller.sales.ProrationFactorsPMP.ProrationFactorsPMPController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ProrationFactorsPMPController',
    fecha: new Date(),
    searchParams: {},
    init: function(view) {
        console.log('1)  APPLICATION PRORATION FACTORS - CONTROLLER PRORATION FACTORS - INIT');
        prototype.id = 'ProrationFactorsPMPForm';
        prototype.url = CONTEXTPATH + '/ProrationFactorsPMP';
        var me = this;
        this.control({
            // -------------------Eventos Genericos --------------------
            '#ProrationFactorsPMPForm-xpanel': {
                afterrender: this.xpanel_afterrender
            }
            ,
            '#ProrationFactorsPMPForm-btnSearch': {
                click: this.btnSearch_click
            },
            '#ProrationFactorsPMPForm-btnClear': {
                click: this.btnClear_click
            },
            '#ProrationFactorsPMPForm-btnExcel': {
                click: this.btnExcel_click
            },
            '#ProrationFactorsPMPForm-btnFilter': {
                click: this.btnFilter_click
            },
            '#ProrationFactorsPMPForm-btnAdd': {
                click: this.btnAdd_click
            },
            '#ProrationFactorsPMPForm-btnBack': {
                click: this.btnBack_click
            },
            '#ProrationFactorsPMPForm-btn-pag-first': {
                click: this.pagFirst
            },
            '#ProrationFactorsPMPForm-btn-pag-previous': {
                click: this.pagPrevious
            },
            '#ProrationFactorsPMPForm-btn-pag-next': {
                click: this.pagNext
            },
            '#ProrationFactorsPMPForm-btn-pag-last': {
                click: this.pagLast
            }

            //-----------------Eventos Especificos -------------------
            ,
            '#ProrationFactorsPMPForm-cmbSearchType': {
                select: this.selectcmbSearchType
            },
            '#ProrationFactorsPMPForm-txtCodOri': {
                keyup: this.eventKey,
                change: this.onUpperValue

            },
            '#ProrationFactorsPMPForm-txtCodDes': {
                keyup: this.eventKey,
                change: this.onUpperValue
            },
            '#ProrationFactorsPMPForm-txtOrigen': {
                keyup: this.eventKey,
                change: this.onUpperValue

            },
            '#ProrationFactorsPMPForm-txtDestination': {
                keyup: this.eventKey,
                change: this.onUpperValue
            },
            '#ProrationFactorsPMPForm-cmbDateFromYear': {
                afterrender: this.afterRenderYear,
                select: this.selectComboFromYear
            },
            /*'#ProrationFactorsPMPForm-cmbDateToYear': {
                afterrender: this.afterRenderYear
            }
            ,*/
            '#ProrationFactorsPMPForm-cmbDateFromMonth': {
                afterrender: this.afterRenderMonthFrom,
                select: this.selectComboFromMonth
            },
            /*'#ProrationFactorsPMPForm-cmbDateToMonth': {
                afterrender: this.afterRenderMonthTo,
                select: this.selectComboToMonth
            },*/
            '#ProrationFactorsPMPForm-rbgFactorDataDisplay': {
                change: this.radioChange
            }
        });
    },
    xpanel_afterrender: function(obj, e) {
        this.setStoreData();
        Ext.getCmp(prototype.id + '-cmbSearchType').setValue("CITY_CODE");
        Ext.getCmp(prototype.id + '-txtCodOri').show();
        Ext.getCmp(prototype.id + '-txtCodDes').show();
        Ext.getCmp(prototype.id + '-txtOrigen').hide();
        Ext.getCmp(prototype.id + '-txtDestination').hide();
        Ext.getCmp(prototype.id + '-gridData').show();
        Ext.getCmp(prototype.id + '-gridDataAll').hide();

        this.btnSearch_click();
    },
    afterRenderYear: function(obj) {
        obj.setValue(this.fecha.getFullYear());
    },
    afterRenderMonthFrom: function(obj) {
        obj.setValue('0' + 1);
    },
    afterRenderMonthTo: function(obj) {
        console.log('0' + (this.fecha.getMonth() + 1));
        obj.setValue('0' + (this.fecha.getMonth() + 1));
    },
    selectComboFromYear: function(obj) {
        //var comboToYear = Ext.getCmp(prototype.id + '-cmbDateToYear');
        var storeComboDataYear = win.getStoreYear2(false, obj.getValue());
        //comboToYear.bindStore(storeComboDataYear);
        //comboToYear.setValue(obj.getValue());
    },
    selectComboFromMonth: function(obj) {

        var comboFromYear = Ext.getCmp(prototype.id + '-cmbDateFromYear');
        //var comboToYear = Ext.getCmp(prototype.id + '-cmbDateToYear');
        //var comboToMonth = Ext.getCmp(prototype.id + '-cmbDateToMonth');

        /*if (comboFromYear.getValue() === comboToYear.getValue()) {
            if (obj.getValue() > comboToMonth.getValue()) {
                comboToMonth.setValue(obj.getValue());
            }
        }*/
    },
    selectComboToMonth: function(obj) {
        var comboFromYear = Ext.getCmp(prototype.id + '-cmbDateFromYear');
        //var comboToYear = Ext.getCmp(prototype.id + '-cmbDateToYear');
        //var comboFromMonth = Ext.getCmp(prototype.id + '-cmbDateFromMonth');


        /*if (comboFromYear.getValue() === comboToYear.getValue()) {
            if (obj.getValue() < comboFromMonth.getValue()) {
                comboFromMonth.setValue(obj.getValue());
            }
        }*/
    },
    radioChange: function(obj) {
        console.log(obj.getValue().rb);
        var option = obj.getValue().rb;
        if (option === 'ALL_DATA') {
            Ext.getCmp(prototype.id + '-gridData').hide();
            Ext.getCmp(prototype.id + '-gridDataAll').show();
        } else {
            Ext.getCmp(prototype.id + '-gridData').show();
            Ext.getCmp(prototype.id + '-gridDataAll').hide();
        }

    },
    selectcmbSearchType: function(obj) {

        var opt = obj.getValue();
        switch (opt) {
            case 'CITY_CODE':
                Ext.getCmp(prototype.id + '-txtCodOri').setValue('');
                Ext.getCmp(prototype.id + '-txtCodDes').setValue('');
                Ext.getCmp(prototype.id + '-txtCodOri').show();
                Ext.getCmp(prototype.id + '-txtCodDes').show();
                Ext.getCmp(prototype.id + '-txtOrigen').hide();
                Ext.getCmp(prototype.id + '-txtDestination').hide();
                break;
            case 'CITY_NAME':
                Ext.getCmp(prototype.id + '-txtOrigen').setValue('');
                Ext.getCmp(prototype.id + '-txtDestination').setValue('');
                Ext.getCmp(prototype.id + '-txtCodOri').hide();
                Ext.getCmp(prototype.id + '-txtCodDes').hide();
                Ext.getCmp(prototype.id + '-txtOrigen').show();
                Ext.getCmp(prototype.id + '-txtDestination').show();
                break;
        }

    },
    onUpperValue: function(field, newValue, oldValue) {
        field.setValue(newValue.toUpperCase());
    },
    setStoreData: function() {

        var storeComboDataYear = win.getStoreYear(false);
        var storeComboDataYear2 = win.getStoreYear2(false, this.fecha.getFullYear());
        Ext.getCmp(prototype.id + '-cmbDateFromYear').bindStore(storeComboDataYear);
        //Ext.getCmp(prototype.id + '-cmbDateToYear').bindStore(storeComboDataYear2);

        var storeComboDataMonth = win.getStoreMonth(true);
        Ext.getCmp(prototype.id + '-cmbDateFromMonth').bindStore(storeComboDataMonth);
        //Ext.getCmp(prototype.id + '-cmbDateToMonth').bindStore(storeComboDataMonth);


        var cmbSearch = Ext.getCmp(prototype.id + '-cmbSearchType');
        cmbSearch.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["CITY_CODE", "City Code"],
                ["CITY_NAME", "City Name"]
            ]
        }));
    }
    ,
    btnSearch_click: function(obj, e) {
        this.setGridData(obj, e);
    },
    setParams: function() {
        var type = Ext.getCmp(prototype.id + '-cmbSearchType').getValue();
        var yearFrom = Ext.getCmp(prototype.id + '-cmbDateFromYear');
        //var yearTo = Ext.getCmp(prototype.id + '-cmbDateToYear');
        var monthFrom = Ext.getCmp(prototype.id + '-cmbDateFromMonth');
        //var monthTo = Ext.getCmp(prototype.id + '-cmbDateToMonth');
        var codOri = Ext.getCmp(prototype.id + '-txtCodOri').getValue();
        var codDes = Ext.getCmp(prototype.id + '-txtCodDes').getValue();
        var origen = Ext.getCmp(prototype.id + '-txtOrigen').getValue();
        var destination = Ext.getCmp(prototype.id + '-txtDestination').getValue();
        var rbgFactorDataDisplay = Ext.getCmp(prototype.id + '-rbgFactorDataDisplay').getValue().rb;
        var IN_DISPLAY = rbgFactorDataDisplay;
        console.log(IN_DISPLAY);

        var dateFrom = yearFrom.getValue() + monthFrom.getValue();
        //var dateTo = yearTo.getValue() + monthTo.getValue();
        var IN_FFILTRO;
        var IN_CITY_ORIG;
        //var IN_CITY_DEST;
        var IN_MODE = 'FACTOR'; // IN_MODE = 'BASE' / IN_MODE = 'FACTOR'


        if (type === 'CITY_CODE') {
            IN_FFILTRO = '1';
            IN_CITY_ORIG = codOri;
            IN_CITY_DEST = codDes;
        } else if (type === 'CITY_NAME') {
            IN_FFILTRO = '2';
            IN_CITY_ORIG = origen;
            IN_CITY_DEST = destination;
        }




        searchParams = {
            IN_FFILTRO: IN_FFILTRO,
            IN_DATE_FROM: dateFrom,
            //IN_DATE_TO: dateTo,
            IN_CITY_ORIG: IN_CITY_ORIG,
            IN_CITY_DEST: IN_CITY_DEST,
            IN_CORDER: '',
            IN_DORDER: 'ASC',
            IN_DISPLAY: IN_DISPLAY,
            IN_MODE : IN_MODE
        };

        console.log(searchParams);



    },
    setGridData: function(obj, val) {
        this.setParams();
        console.log("URL : " + prototype.url + '/search');
        var storeGridDatas = Ext.create('Ext.Praxis.store.sales.ProrationFactorsPMP.GridData', {
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
        Ext.getCmp(prototype.id + '-gridData').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-gridDataAll').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas);
    },
    eventKey: function(e, eOpts) {

        if (eOpts.getKey() === 13) {
            this.btnSearch_click();
        }
    }
    ,
    btnClear_click: function(obj, e) {


        var yearFrom = Ext.getCmp(prototype.id + '-cmbDateFromYear');
        //var yearTo = Ext.getCmp(prototype.id + '-cmbDateToYear');
        var monthFrom = Ext.getCmp(prototype.id + '-cmbDateFromMonth');
        //var monthTo = Ext.getCmp(prototype.id + '-cmbDateToMonth');


        yearFrom.setValue(this.fecha.getFullYear());
        var storeComboDataYear = win.getStoreYear2(false, yearFrom.getValue());
        //yearTo.bindStore(storeComboDataYear);
        //yearTo.setValue(this.fecha.getFullYear());
        monthFrom.setValue('0' + 1);
        //monthTo.setValue('0' + (this.fecha.getMonth() + 1));

        Ext.getCmp(prototype.id + '-txtCodOri').setValue('');
        Ext.getCmp(prototype.id + '-txtCodDes').setValue('');
        Ext.getCmp(prototype.id + '-txtOrigen').setValue('');
        Ext.getCmp(prototype.id + '-txtDestination').setValue('');

    },
    btnExcel_click: function(obj, e) {
        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: 'Download Excel?',
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
        this.setParams();

        global.getFile(prototype.url + '/getXLSX?IN_FFILTRO=' + searchParams.IN_FFILTRO
                + '&IN_DATE_FROM=' + searchParams.IN_DATE_FROM
                + '&IN_DATE_TO=' + searchParams.IN_DATE_TO
                + '&IN_CITY_ORIG=' + searchParams.IN_CITY_ORIG
                + '&IN_CITY_DEST=' + searchParams.IN_CITY_DEST
                + '&IN_CORDER=' + searchParams.IN_CORDER
                + '&IN_DORDER=' + searchParams.IN_DORDER
                + '&IN_DISPLAY=' + searchParams.IN_DISPLAY
                + '&IN_MODE=' + searchParams.IN_MODE);
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
    /**
     * Metodos usados para el CRUD
     * */
    btnAdd_click: function(obj, e) {
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
        all = all === null || all === undefined ? {} : all;
        rowIndex = rowIndex === null || rowIndex === undefined ? {} : rowIndex;

        Ext.create('Ext.Praxis.view.sales.Resolution024Form.DataEntry', {
            id: prototype.id + '-dataEntry',
            params: {
                action: action,
                rec: rec,
                all: all,
                rowIndex: rowIndex
            }
        }).show();

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
    },
    btnBack_click: function(obj, e) {
        var heightMenu = 400;
        Ext.getCmp('App-main' + '-region-content-north').setHeight(heightMenu);
    }
});
