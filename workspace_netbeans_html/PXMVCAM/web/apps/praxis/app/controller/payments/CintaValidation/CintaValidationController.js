/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/JavaScript.js to edit this template
 */


Ext.define('Ext.Praxis.controller.payments.CintaValidation.CintaValidationController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.CintaValidationController',
    fecha: new Date(),
    childs: '5',
    bean: '',
    paginActual: '',
    drillDown: [],
    lstBank: [],
    gridActual: '',
    panelActual: '',
    fileName: '',
    me: '',
    searchParams: {},
    paramsDetail: {},
    dataObtain: {},

    init: function (view) {
        me = this;
        prototype.id = 'CintaValidationForm';
        prototype.url = CONTEXTPATH + '/CintaValidation';
        this.childs = Ext.getCmp(prototype.id + '-panelMain').items.items;
        me.panelActual = '-panelGridData';
        global.selectedChild(me.childs, prototype.id + me.panelActual);


        this.control({
            //   -------------------Eventos Genericos --------------------
            '#CintaValidationForm-xpanel': {
                afterrender: this.xpanel_afterrender
            },
            '#CintaValidationForm-btnSearch': {
                click: this.btnSearch_click
            },
            '#CintaValidationForm-btnClear': {
                click: this.btnClear_click
            },
            '#CintaValidationForm-btnExcel': {
                click: this.btnExcel_click
            },
            '#CintaValidationForm-btnFilter': {
                click: this.btnFilter_click
            },
            '#CintaValidationForm-btnAdd': {
                click: this.btnAdd_click
            },
            '#CintaValidationForm-btnBack': {
                click: this.btnBack_click
            },
            '#CintaValidationForm-btn-pag-first': {
                click: this.pagFirst
            },
            '#CintaValidationForm-btn-pag-previous': {
                click: this.pagPrevious
            },
            '#CintaValidationForm-btn-pag-next': {
                click: this.pagNext
            },
            '#CintaValidationForm-btn-pag-last': {
                click: this.pagLast
            }
//            //-----------------Eventos Especificos -------------------    
        });
    },

    xpanel_afterrender: function (obj, e) {
        this.btnSearch_click();


        // this.obtainData();

    },

    //

    eventKey: function (e, eOpts) {
        if (eOpts.getKey() === 13) {
            this.btnSearch_click();
        }
    },
    onUpperValue: function (field, newValue, oldValue) {
        field.setValue(newValue.toUpperCase());
    },

    setFormatParameter: function () {

        me.bean = {};



        var yearFrom = Ext.getCmp(prototype.id + '-cmbYearFrom').getValue();
        var monthFrom = Ext.getCmp(prototype.id + '-cmbMonthFrom').getValue();

        var yearTo = Ext.getCmp(prototype.id + '-cmbYearTo').getValue();
        var monthTo = Ext.getCmp(prototype.id + '-cmbMonthTo').getValue();

        me.bean.IN_DATEF = yearFrom + monthFrom;
        me.bean.IN_DATET = yearTo + monthTo;

        var beanString = JSON.stringify(me.bean);

        searchParams = {
            bean: me.bean,
            beanString: beanString
        };
    },

    btnSearch_click: function (obj, e) {
        this.setFormatParameter();
        this.setGridData();


    },

    setGridData: function () {
        win.lblUser_toolTip("Estructura: A1348");
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
            Ext.getCmp(prototype.id + '-gridSearch').bindStore(storeGridDatas);
            Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas);
        }
    },

    onGridDetail: function (grid, rowIndex, colIndex, item, e, record) {

        var fechaProceso = record.get('fechaProceso');

        console.log('Fecha seleccionada:', fechaProceso);

        me.drillDown.push(me.panelActual);

        me.panelActual = '-panelGridDetail';

        Ext.getCmp(prototype.id + '-panelGridSearch').hide();
        Ext.getCmp(prototype.id + '-panelGridDetail').show();

        me.obEmailDetail = {
            IN_DATE: fechaProceso
        };

        me.obEmailDetail.beanString = JSON.stringify({
            IN_DATE: fechaProceso
        });

        this.setGridDataDetail();

    },

    /////


    setGridDataDetail: function () {

        win.lblUser_toolTip("Estructura: A1348Filter DETAIL");

        me.setWidthPie();

        var msj = this.validateFields();

        if (msj !== '') {
            global.Msg({msg: msj});
        } else {

            var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
                proxy: {
                    url: prototype.url + '/searchDetail'
                },
                listeners: {
                    beforeload: function (obj) {
                        obj.proxy.extraParams = me.obEmailDetail;
                    },
                    load: function (obj) {

                        var pag = Ext.getCmp(prototype.id + '-pagginCintaValidation');
                        ;
                        var pagData = pag.getPageData();

                        Ext.getCmp(prototype.id + '-lbl-currentPage').setText(
                                Ext.util.Format.number(pagData.currentPage, '0,000'));

                        Ext.getCmp(prototype.id + '-lbl-pageCount').setText(
                                Ext.util.Format.number(pagData.pageCount, '0,000'));

                        Ext.getCmp(prototype.id + '-lbl-total').setText(
                                Ext.util.Format.number(pagData.total, '0,000'));

                        if (obj.data.length === 0) {
                            global.Msg({
                                msg: 'Data not found.'
                            });
                        } else {

                            Ext.getCmp(prototype.id + '-lblProcess').setText(
                                    'Fecha Proceso : ' + me.obEmailDetail.IN_DATE
                                    );

                            Ext.getCmp(prototype.id + '-lblProcess').setVisible(true);
                        }

                        me.setWidthPie();
                    }
                }
            });

            global.clear();

            Ext.getCmp(prototype.id + '-gridSearchDetail').bindStore(storeGridDatas);
            Ext.getCmp(prototype.id + '-pagginCintaValidation').bindStore(storeGridDatas);

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

    //DATAENTRY


    ///data entry ingreso ///

//    onEditClick: function (grid, rowIndex, colIndex) {
//
//        var rec = grid.getStore().getAt(rowIndex);
//        this.winDataEntry('U', rec);
//
//    },
    winDataEntry: function (action, rec) {
        action = action === null || action === undefined ? 'U' : action;
        rec = rec === null || rec === undefined ? {} : rec;

        console.log('PRUEBA MESAJE');

        Ext.create('Ext.Praxis.view.payments.EmailControlForm.DataEntry', {
            id: prototype.id + '-dataEntry',
            params: {
                action: action,
                rec: rec.data,

                lst: me.lst
            }
        }).show();
    },

    btnBack_click: function (obj, e) {

        if (me.drillDown.length > 0) {
            me.panelActual = me.drillDown.pop();
            Ext.getCmp(prototype.id + '-panelGridDetail').hide();
            Ext.getCmp(prototype.id + '-panelGridSearch').show();
            me.panelActual = '-panelGridSearch';
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

        Ext.getCmp(prototype.id + '-txtAGENTFILT')?.setValue('');
        Ext.getCmp(prototype.id + '-cmbIN_COUNTRY')?.setValue('');
        Ext.getCmp(prototype.id + '-cmbAGROUPD')?.setValue('');

        this.btnSearch_click();


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

        if (Ext.getCmp(prototype.id + '-panelGridDetail').isVisible()) {

            global.getFile(prototype.url + '/getXLSXDetail?beanString=' + encodeURI(me.obEmailDetail.beanString)
                    );

        } else {

            global.getFile(prototype.url + '/getXLSX?beanString=' + encodeURI(searchParams.beanString));

        }

    },

    btnFilter_click: function (obj) {
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

            case '-panelGridSearch':
                me.pagginActual = '-paggin';
                break;

            case '-panelGridDetail':
                me.pagginActual = '-pagginCintaValidation';
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
    }


}
);

