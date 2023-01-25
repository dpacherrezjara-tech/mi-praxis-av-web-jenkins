/* 
 ******************************************************************
 * Program Information                                            *
 *                                                                *
 * Project    : PRAXIS - AM                                       *          
 * Document   : SSIMDuplicatedController                          *                          
 * Created on : 19/02/2018, 14:29:15                              *               
 * Author     : Gregory Sánchez (gsanchez)                        *           
 *                                                                *
 ******************************************************************
 *                  MIAMI TECHNOLOGY GROUP, INC.                  *
 *                           MIATECH                              *
 *                           OF PERU                              *
 ******************************************************************
 * CODIGO PRG FECHA      CONCEPTO
 * 201601 RMC 20-09-2016 SE CREA PROGRAMA A PEDIDO DE JGG.
 ******************************************************************
 */

Ext.define('Ext.Praxis.controller.flown.SSIMDuplicated.SSIMDuplicatedController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.SSIMDuplicatedController',
    fecha: new Date(),
    dateFrom: '',
    dateTo: '',
    flightNumber: '',
    me: '',
    searchParams: {},
    beanTMP: {},
    setContext: function() {
        me = this;
    },
    init: function(view) {
        me = this;
        prototype.id = 'SSIMDuplicatedForm';
        prototype.id01 = 'DataEntrySSIMDuplicatedForm';
        prototype.url = CONTEXTPATH + '/SSIMDuplicated';
        prototype.widthContenedor = 1400;
        prototype.widthGrid = 1208;
        prototype.heightGrid = 529;
        this.control({
            '#SSIMDuplicatedForm-btn-pag-first': {
                click: this.pagFirst
            },
            '#SSIMDuplicatedForm-btn-pag-previous': {
                click: this.pagPrevious
            },
            '#SSIMDuplicatedForm-btn-pag-next': {
                click: this.pagNext
            },
            '#SSIMDuplicatedForm-btn-pag-last': {
                click: this.pagLast
            },
            '#SSIMDuplicatedForm-cmbDateFromYear': {
                afterrender: this.afterRenderYear,
                select: this.selectComboFromYear
            },
            '#SSIMDuplicatedForm-cmbDateToYear': {
                afterrender: this.afterRenderYear
            }
            ,
            '#SSIMDuplicatedForm-cmbDateFromMonth': {
                afterrender: this.afterRenderMonth,
                select: this.selectComboFromMonth
            },
            '#SSIMDuplicatedForm-cmbDateToMonth': {
                afterrender: this.afterRenderMonth,
                select: this.selectComboToMonth
            }
        });
    },
    afterRender: function() {
//        this.onClearClick();
        this.setStoreData();
        this.onSearchClick();
    },
    afterRenderYear: function(obj) {
        obj.setValue(this.fecha.getFullYear());
    },
    afterRenderMonth: function(obj) {
        var month = this.fecha.getMonth() + 1;
        if (month < 9) {
            obj.setValue('0' + month);
        } else {
            obj.setValue((month));
        }
    },
    selectComboFromYear: function(obj) {
        var comboToYear = Ext.getCmp(prototype.id + '-cmbDateToYear');
        var storeComboDataYear = win.getStoreYear2(false, obj.getValue());
        comboToYear.bindStore(storeComboDataYear);
        comboToYear.setValue(obj.getValue());
    }
    ,
    selectComboFromMonth: function(obj) {

        var comboFromYear = Ext.getCmp(prototype.id + '-cmbDateFromYear');
        var comboToYear = Ext.getCmp(prototype.id + '-cmbDateToYear');
        var comboToMonth = Ext.getCmp(prototype.id + '-cmbDateToMonth');

        if (comboFromYear.getValue() === comboToYear.getValue()) {
            if (obj.getValue() > comboToMonth.getValue()) {
                comboToMonth.setValue(obj.getValue());
            }
        }
    },
    selectComboToMonth: function(obj) {
        var comboFromYear = Ext.getCmp(prototype.id + '-cmbDateFromYear');
        var comboToYear = Ext.getCmp(prototype.id + '-cmbDateToYear');
        var comboFromMonth = Ext.getCmp(prototype.id + '-cmbDateFromMonth');


        if (comboFromYear.getValue() === comboToYear.getValue()) {
            if (obj.getValue() < comboFromMonth.getValue()) {
                comboFromMonth.setValue(obj.getValue());
            }
        }
    }
    ,
    setStoreData: function() {
        var storeComboDataYear = win.getStoreYear(true);
        Ext.getCmp(prototype.id + '-cmbDateFromYear').bindStore(storeComboDataYear);
        Ext.getCmp(prototype.id + '-cmbDateToYear').bindStore(storeComboDataYear);

        var storeComboDataMonth = win.getStoreMonth(true);
        Ext.getCmp(prototype.id + '-cmbDateFromMonth').bindStore(storeComboDataMonth);
        Ext.getCmp(prototype.id + '-cmbDateToMonth').bindStore(storeComboDataMonth);

        var storeComboDataDay = win.getStoreDays(true);
        Ext.getCmp(prototype.id + '-cmbDateFromDay').bindStore(storeComboDataDay);
        Ext.getCmp(prototype.id + '-cmbDateToDay').bindStore(storeComboDataDay);
    }
    ,
    onSearchClick: function(obj, e) {
        this.setFormatParameter();
        this.setGridData(obj, e);
    },
    setFormatParameter: function() {
        var yearFrom = Ext.getCmp(prototype.id + '-cmbDateFromYear');
        var yearTo = Ext.getCmp(prototype.id + '-cmbDateToYear');
        var monthFrom = Ext.getCmp(prototype.id + '-cmbDateFromMonth');
        var monthTo = Ext.getCmp(prototype.id + '-cmbDateToMonth');
        var dayFrom = Ext.getCmp(prototype.id + '-cmbDateFromDay');
        var dayTo = Ext.getCmp(prototype.id + '-cmbDateToDay');
        var flightNum = Ext.getCmp(prototype.id + '-textFlightNumber');

        if (dayFrom.getValue() === null || dayFrom.getValue() === '') {
            dayFrom.setValue('');
            dayTo.setValue('');
        } else {
            if (dayTo.getValue() === null || dayTo.getValue() === '') {
                dayTo.setValue(31);
            }
        }
        if (flightNum.getValue().length >= 1) {
            while (flightNum.getValue().length < 4) {
                flightNum.setValue('0' + flightNum.getValue());
            }
        }
        this.dateFrom = yearFrom.getValue() + monthFrom.getValue() + dayFrom.getValue();
        this.dateTo = yearTo.getValue() + monthTo.getValue() + dayTo.getValue();
        this.flightNumber = flightNum.getValue();

        searchParams = {
            IN_FECHA_FROM: this.dateFrom,
            IN_FECHA_TO: this.dateTo,
            IN_NFLIGHT: this.flightNumber
        };
    },
    setGridData: function(obj, val) {
        this.setFormatParameter();
        var storeGridDatas = Ext.create('Ext.Praxis.store.flown.SSIMDuplicated.GridData', {
            proxy: {
                url: prototype.url + '/search'
            }, listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = searchParams;
                },
                load: function(obj) {
                    var pag = Ext.getCmp(prototype.id + '-paggin');
                    var pagData = pag.getPageData();

                    var currentPage = Ext.util.Format.number(pagData.currentPage, '0,000');
                    var pageCount = Ext.util.Format.number(pagData.pageCount, '0,000');
                    var total = Ext.util.Format.number(pagData.total, '0,000');

                    Ext.getCmp(prototype.id + '-lbl-currentPage').setText(currentPage);
                    Ext.getCmp(prototype.id + '-lbl-pageCount').setText(pageCount);
                    Ext.getCmp(prototype.id + '-lbl-total').setText(total);
                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found'
                        });
                    }
                }
            }
        });
        Ext.getCmp(prototype.id + '-gridData').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas);
    },
//    eventKey: function(e, eOpts) {
//
//        if (eOpts.getKey() === 13) {
//            this.btnSearch_click();
//        }
//    }
//    ,
    onClearClick: function(obj, e) {
        var yearFrom = Ext.getCmp(prototype.id + '-cmbDateFromYear');
        var yearTo = Ext.getCmp(prototype.id + '-cmbDateToYear');
        var monthFrom = Ext.getCmp(prototype.id + '-cmbDateFromMonth');
        var monthTo = Ext.getCmp(prototype.id + '-cmbDateToMonth');
        var dayFrom = Ext.getCmp(prototype.id + '-cmbDateFromDay');
        var dayTo = Ext.getCmp(prototype.id + '-cmbDateToDay');
        var flightNum = Ext.getCmp(prototype.id + '-textFlightNumber');

        yearFrom.setValue(this.fecha.getFullYear());
        var storeComboDataYear = win.getStoreYear2(false, yearFrom.getValue());
        yearTo.bindStore(storeComboDataYear);
        yearTo.setValue(this.fecha.getFullYear());




        var month = this.fecha.getMonth() + 1;
        if (month < 9) {
            monthTo.setValue('0' + month);
        } else {
            monthTo.setValue((month));
        }

        dayFrom.setValue("");
        dayTo.setValue("");
        flightNum.setValue("");
    },
    onExcelClick: function(obj, e) {
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
        this.setFormatParameter();
        global.getFile(prototype.url + '/getXLSX?dateFrom=' + searchParams.IN_FECHA_FROM + '&dateTo=' + searchParams.IN_FECHA_TO + '&flightNumber=' + searchParams.IN_NFLIGHT);
    }
    ,
    onFilterClick: function(obj) {
        var option = Ext.getCmp(prototype.id + '-contenedor-filters');
        if (option.isVisible()) {
            option.setVisible(false);
        } else {
            option.setVisible(true);
        }
    },
    onEditClick: function(grid, rowIndex, colIndex) {
        var rec = grid.getStore().getAt(rowIndex);
        var all = grid.getStore();
        this.winDataEntry('U', rec, all, rowIndex);
    },
    winDataEntry: function(action, rec, all, rowIndex) {
        action = action === null || action === undefined ? 'U' : action;
        rec = rec === null || rec === undefined ? {} : rec;
        Ext.create('Ext.Praxis.view.flown.SSIMDuplicatedForm.DataEntry', {
            id: 'DataEntrySSIMComplementaryFilesForm',
            params: {
                action: action,
                rec: rec,
                all: all,
                rowIndex: rowIndex
            }
        }).show();

    },
    onSearchTextKeypress: function(obj, e, eOpts) {
        if (e.getKey() == e.ENTER) {
            this.onSearchClick();
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
