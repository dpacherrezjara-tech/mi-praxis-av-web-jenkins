
Ext.define('Ext.Praxis.controller.payments.EmailControl.EmailControlController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.EmailControlController',
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
        prototype.id = 'EmailControlForm';
        prototype.url = CONTEXTPATH + '/EmailControl';
        this.childs = Ext.getCmp(prototype.id + '-panelMain').items.items;
        me.panelActual = '-panelGridData';
        global.selectedChild(me.childs, prototype.id + me.panelActual);


        this.control({
            //   -------------------Eventos Genericos --------------------
            '#EmailControlForm-xpanel': {
                afterrender: this.xpanel_afterrender
            },
            '#EmailControlForm-btnSearch': {
                click: this.btnSearch_click
            },
            '#EmailControlForm-btnClear': {
                click: this.btnClear_click
            },
            '#EmailControlForm-btnExcel': {
                click: this.btnExcel_click
            },
            '#EmailControlForm-btnFilter': {
                click: this.btnFilter_click
            },
            '#EmailControlForm-btnAdd': {
                click: this.btnAdd_click
            },
            '#EmailControlForm-btnBack': {
                click: this.btnBack_click
            },
            '#EmailControlForm-btn-pag-first': {
                click: this.pagFirst
            },
            '#EmailControlForm-btn-pag-previous': {
                click: this.pagPrevious
            },
            '#EmailControlForm-btn-pag-next': {
                click: this.pagNext
            },
            '#EmailControlForm-btn-pag-last': {
                click: this.pagLast
            }
//            //-----------------Eventos Especificos -------------------    
        });
    },

    xpanel_afterrender: function (obj, e) {
        this.btnSearch_click();


        // this.obtainData();

    },

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
        win.lblUser_toolTip("Estructura: MPF248");
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
            Ext.getCmp(prototype.id + '-gridEmailControl').bindStore(storeGridDatas);
            Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas);
        }
    },

    onGridDetail: function (grid, rowIndex, colIndex, item, e, record) {

        me.drillDown.push(me.panelActual);

        me.panelActual = '-panelGridEmailDetail';

        Ext.getCmp(prototype.id + '-panelGridEmail').hide();
        Ext.getCmp(prototype.id + '-panelGridEmailDetail').show();


        me.obEmailDetail = {};
        me.obEmailDetail.IN_PROCESS = record.get('PROCESS');
        me.obEmailDetail.beanString = JSON.stringify(me.obEmailDetail);

        this.setGridEmailDetail();

    },

    /////


    setGridEmailDetail: function () {

        win.lblUser_toolTip("Estructura: MPF248 DETAIL");

        me.setWidthPie();

        var msj = this.validateFields();

        if (msj !== '') {
            global.Msg({msg: msj});
        } else {

            var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
                proxy: {
                    url: prototype.url + '/searchEmailDetail'
                },
                listeners: {
                    beforeload: function (obj) {
                        obj.proxy.extraParams = me.obEmailDetail;
                    },
                    load: function (obj) {

                        var pag = Ext.getCmp(prototype.id + '-pagginEmailDetail');
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
                                    'Process : ' + me.obEmailDetail.IN_PROCESS
                                    );

                            Ext.getCmp(prototype.id + '-lblProcess').setVisible(true);
                        }

                        me.setWidthPie();
                    }
                }
            });

            global.clear();

            Ext.getCmp(prototype.id + '-gridEmailControlDetail').bindStore(storeGridDatas);
            Ext.getCmp(prototype.id + '-pagginEmailDetail').bindStore(storeGridDatas);

        }
    },

    ///////////////

    onDeleteClick: function (grid, rowIndex, colIndex) {

        var me = this;

        var rec = grid.getStore().getAt(rowIndex);

        Ext.Msg.show({

            title: '.:PRAXIS:.',

            msg: 'Are you sure to delete?',

            buttons: Ext.MessageBox.YESNO,

            scope: me,

            icon: Ext.MessageBox.QUESTION,

            modal: true,

            fn: function (btn) {

                if (btn === 'yes') {

                    var beanTemp = rec.data;

                    beanTemp.IN_OPTION = 'D';

                    me.MaintenanceMPF248(beanTemp);

                }

            }

        });

    },

    MaintenanceMPF248: function (beanTemp) {

    var me = this;

        Ext.Ajax.request({
            url: prototype.url + '/mantenimiento',
            method: 'POST',
            timeout: 60000000,
            params: {
                beanString: Ext.encode(beanTemp)
            },
//            beforerequest: Ext.getCmp(prototype.id + '-dataEntry').mask('Loading...'),
            success: function (response, opts) {
                // Ext.getCmp(prototype.id + '-dataEntry').unmask('Loading...');
                var res = Ext.JSON.decode(response.responseText);
                console.log(res);
                if (res.success) {
                    global.Msg({msg: res.Mensaje});
//                    Ext.getCmp(prototype.id + '-dataEntry').unmask();
                    //Ext.getCmp(prototype.id + '-dataEntry').close();
                    //Ext.getCmp(prototype.id + '-btnSearch').fireEvent('click', {});
                    me.setGridEmailDetail();
                } else {
                    global.Msg({msg: 'An error occurred'});
                }
            }
        });
    },

    /////






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

    onEditClick: function (grid, rowIndex, colIndex) {

        var rec = grid.getStore().getAt(rowIndex);
        this.winDataEntry('U', rec);

    },
    winDataEntry: function (action, rec) {
        action = action === null || action === undefined ? 'U' : action;
        rec = rec === null || rec === undefined ? {} : rec;

        console.log(rec, 'PRUEBA MESAJE');
        console.log(rec, data);

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
            Ext.getCmp(prototype.id + '-panelGridEmailDetail').hide();
            Ext.getCmp(prototype.id + '-panelGridEmail').show();
            me.panelActual = '-panelGridEmail';
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
        switch (me.panelActual) {
            case  '-panelGridData':
                global.getFile(prototype.url + '/getXLSX?beanString=' + encodeURI(searchParams.beanString));
                console.log('prueba excel');
                break;
            default:
                global.Msg(
                        {msg: 'Under Construction'
                        });
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

            case '-panelGridEmail':
                me.pagginActual = '-paggin';
                break;

            case '-panelGridEmailDetail':
                me.pagginActual = '-pagginEmailDetail';
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
