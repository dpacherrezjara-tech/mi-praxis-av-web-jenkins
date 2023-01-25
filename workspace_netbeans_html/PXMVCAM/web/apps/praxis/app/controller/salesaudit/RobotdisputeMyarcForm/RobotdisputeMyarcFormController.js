
Ext.define('Ext.Praxis.controller.salesaudit.RobotdisputeMyarcForm.RobotdisputeMyarcFormController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.RobotdisputeMyarcFormController',

    bean: {},
    bean2: {},
    bean3: {},
    /**
     * Constructor
     */

    init: function (view) {
        var me = this;
        this.setStoresFilters();

    },
    /**
     * Se ejecuta luego de haber cargado todos los componentes
     */
    afterRender: function () {
        this.setStores();
    },
    onRendererColumnOnTime: function (value, metaData, record, rowIndex, colIndex, store, view) {
        switch (String(record.get('A4139FINA'))) {
            case 'D':
                value = 'silver';
                break;
            case 'A':
                value = 'green';
                break;
            default:
                value = 'red';
        }
        return '<i class="fas fa-circle" style="font-size: 16px; color:' + value + ';"></i>';
    },
    OnBeforeShow: function () {
        prototype.idRobotdisputeMyarc = 'RobotdisputeMyarcForm';
        prototype.url = CONTEXTPATH + '/RobotdisputeMyarcForm';
        prototype.widthWindow = 1366;
        prototype.heightWindow = 768;
    },
    setStores: function () {
        var grid01 = Ext.getCmp(prototype.idRobotdisputeMyarc + '-gridData');
        var grid02 = Ext.getCmp(prototype.idRobotdisputeMyarc + '-gridDetalle');

        var store01 = Ext.create('Ext.data.Store', {
            proxy: {
                type: 'ajax',
                url: prototype.url + '/SearchDebitos/',
                timeout: '300000',
                reader: {
                    type: 'json',
                    rootProperty: 'data',
                    totalProperty: 'total'
                }
            },
            //autoLoad: true,
            pageSize: 25
        });

        var store02 = Ext.create('Ext.data.Store', {
            proxy: {
                type: 'ajax',
                url: prototype.url + '/SearchDebitos/',
                timeout: '300000',
                reader: {
                    type: 'json',
                    rootProperty: 'data',
                    totalProperty: 'total'
                }
            }//,
            //autoLoad: true,
            //pageSize: 25
        });

        grid01.setStore(store01);
        grid02.setStore(store02);
        //pager01.setStore(store01);

    },
    setStoresFilters: function () {
        var cmbSearch = Ext.getCmp(prototype.idRobotdisputeMyarc + '-search-type');
        var cmbRobot = Ext.getCmp(prototype.idRobotdisputeMyarc + '-ComboRobot');
        var cmbStatus = Ext.getCmp(prototype.idRobotdisputeMyarc + '-CmbStatus');
        var cmbArea = Ext.getCmp(prototype.idRobotdisputeMyarc + '-CmbArea');

        cmbSearch.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "1", "name": "SYSTEM DATE"}
            ]
        }));

        cmbStatus.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "", "name": "ALL"},
                {"code": "E", "name": "ERROR IN THE PROCESS"},
                {"code": "T", "name": "FORMAT ERROR"},
                {"code": "H", "name": "FAILURE TO CONFIRM EMAIL"},
                {"code": "M", "name": "MANY PEOPLE CONNECTED"},
                {"code": "Y", "name": "PENDING TO EXECUTE"},
                {"code": "A", "name": "PROCESSED CORRECTLY"},
                {"code": "C", "name": "PASSWORD EXPIRED"},
                {"code": "N", "name": "USER NOT ALLOWED"},
                {"code": "D", "name": "WITHOUT DATA"}
            ]
        }));
        cmbRobot.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "1", "name": "Download of disputes"},
                {"code": "2", "name": "Send disputes worked"}
            ]
        }));
        cmbArea.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "", "name": "All"},
                {"code": "CR", "name": "Crédito y Cobranzas"},
                {"code": "VI", "name": "Venta Indirecta"},
                {"code": "CM", "name": "Comisiones"}
            ]
        }));
    },
    onchange: function (field, newValue, oldValue) {
        field.setValue(newValue.toUpperCase());
    },
    onCmbSearchAfterRender: function (obj) {
        obj.setValue('1');
    },
    onSearchkey: function (f, e) {
        if (e.getKey() === e.ENTER) {
            this.imgSearch_clickHandler();
        }

    },
    onCmbRobotAfterRender: function (obj) {
        obj.setValue('1');
    },
    onCmbStatusAfterRender: function (obj) {
        obj.setValue('');
    },
    onCmbAreaAfterRender: function (obj) {
        obj.setValue('');
    },
    onBackClick: function (obj, e) {
        Ext.getCmp(prototype.idRobotdisputeMyarc + '-gridData').setVisible(true);
        Ext.getCmp(prototype.idRobotdisputeMyarc + '-lbl-total').setVisible(true);
        Ext.getCmp(prototype.idRobotdisputeMyarc + '-btn-search').setVisible(true);

        //Ext.getCmp(prototype.idRobotdisputeMyarc + '-lbl-total').setText('0');
        Ext.getCmp(prototype.idRobotdisputeMyarc + '-CmbArea').setValue("");
        Ext.getCmp(prototype.idRobotdisputeMyarc + '-Audit').setValue("");
        Ext.getCmp(prototype.idRobotdisputeMyarc + '-gridDetalle').setVisible(false);
        Ext.getCmp(prototype.idRobotdisputeMyarc + '-lbl-totalDeta').setVisible(false);
        Ext.getCmp(prototype.idRobotdisputeMyarc + '-btn-back').setVisible(false);
        Ext.getCmp(prototype.idRobotdisputeMyarc + '-btn-excel').setVisible(false);
        Ext.getCmp(prototype.idRobotdisputeMyarc + '-btn-search2').setVisible(false);
        Ext.getCmp(prototype.idRobotdisputeMyarc + '-CmbArea').setVisible(false);
        Ext.getCmp(prototype.idRobotdisputeMyarc + '-Audit').setVisible(false);
    },
    imgSearch_clickHandler: function (obj, records, eOpts) {
        var cmbsearch = Ext.getCmp(prototype.idRobotdisputeMyarc + '-search-type').getValue();
        var txtDateFrom = Ext.getCmp(prototype.idRobotdisputeMyarc + '-txtFilterDateFrom').getRawValue();
        var txtDateTo = Ext.getCmp(prototype.idRobotdisputeMyarc + '-txtFilterDateTo').getRawValue();
        var CmbRobot = Ext.getCmp(prototype.idRobotdisputeMyarc + '-ComboRobot').getValue();
        var CmbStatus = Ext.getCmp(prototype.idRobotdisputeMyarc + '-CmbStatus').getValue();
        if (cmbsearch === '') {
            Ext.MessageBox.alert('PRAXIS', "Select Search Type", function (btn, text) {
                if (btn === 'ok' || btn === 'cancel')
                    setTimeout("Ext.getCmp(prototype.idRobotdisputeMyarc + '-search-type').focus();", 100);
            });
            return;
        }
        if (txtDateFrom === '') {
            Ext.MessageBox.alert('PRAXIS', "Enter Date From", function (btn, text) {
                if (btn === 'ok' || btn === 'cancel')
                    setTimeout("Ext.getCmp(prototype.idRobotdisputeMyarc + '-txtFilterDateFrom').focus();", 100);
            });
            return;
        }
        if (txtDateTo === '') {
            Ext.MessageBox.alert('PRAXIS', "Enter Date To", function (btn, text) {
                if (btn === 'ok' || btn === 'cancel')
                    setTimeout("Ext.getCmp(prototype.idRobotdisputeMyarc + '-txtFilterDateTo').focus();", 100);
            });
            return;
        }
        if (txtDateFrom !== '' && txtDateTo !== '') {

            if (global.existeFecha(txtDateFrom) !== '') {
                Ext.MessageBox.alert('PRAXIS', global.existeFecha(txtDateFrom), function (btn, text) {
                    if (btn === 'ok' || btn === 'cancel')
                        setTimeout("Ext.getCmp(prototype.idRobotdisputeMyarc + '-txtFilterDateFrom').focus();", 100);
                });
                return;
            }

            if (global.existeFecha(txtDateTo) !== '') {
                Ext.MessageBox.alert('PRAXIS', global.existeFecha(txtDateTo), function (btn, text) {
                    if (btn === 'ok' || btn === 'cancel')
                        setTimeout("Ext.getCmp(prototype.idRobotdisputeMyarc + '-txtFilterDateTo').focus();", 100);
                });
                return;
            }
            if (Date.parse(Ext.getCmp(prototype.idRobotdisputeMyarc + '-txtFilterDateFrom').getValue()) > Date.parse(Ext.getCmp(prototype.idRobotdisputeMyarc + '-txtFilterDateTo').getValue())) {
                Ext.MessageBox.alert('PRAXIS', "the starting date must be less than the end date", function (btn, text) {
                    if (btn === 'ok' || btn === 'cancel')
                        setTimeout("Ext.getCmp(prototype.idRobotdisputeMyarc + '-txtFilterDateTo').focus();", 100);
                });
                return;
            }
        }
        //datos capturados del texto
        this.bean.IN_OPTION = cmbsearch;
        this.bean.IN_DATEFROM = txtDateFrom;
        this.bean.IN_DATETO = txtDateTo;
        this.bean.IN_STATUS = CmbStatus;
        this.bean.IN_ROBOT = CmbRobot;
        this.bean.IN_AREA = "";
        this.bean.IN_USER = "";
        this.SearchReportRFND(this.bean, obj === true ? obj : false);

    },
    SearchReportRFND: function (bean, bExcel) {

        if (bExcel) {
            me.exportExcel(prototype.url + '/getXLSX?beanString=' + encodeURI(JSON.stringify(bean)));
        } else {
            Ext.getCmp(prototype.idRobotdisputeMyarc + '-gridData').getStore().removeAll();
            Ext.getCmp(prototype.idRobotdisputeMyarc + '-gridData').getStore().loadPage(1, {
                params: {
                    beanString: JSON.stringify(bean)
                            //beanString: bean

                }, callback: function (records, operation, success) {
                    if (records.length !== 0) {
                        Ext.getCmp(prototype.idRobotdisputeMyarc + '-lbl-total').setText(records[0].data.A4139TOTALPAG);
                    } else {
                        Ext.getCmp(prototype.idRobotdisputeMyarc + '-lbl-total').setText('0');
                        global.Msg({msg: "Data not found.", icon: 2, fn: function () {
                            }});

                    }

                }
            });
        }


    },
    exportExcel: function (_path) {
        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: 'Download Excel ?',
            buttons: Ext.MessageBox.OKCANCEL,
            scope: this,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function (btn) {
                if (btn === 'ok') {
                    global.getFile(_path);
                }
            }
        });
    },
    onExcelClick: function (obj, e) {
        this.searchform_detalle_Dispute_excel();
    },
    onFilterClick: function () {
        var option = Ext.getCmp(prototype.idRobotdisputeMyarc + '-contentFilter');
        if (option.isVisible())
            option.hide();
        else
            option.show();
    },
    onClearClick: function (obj, e) {
        Ext.getCmp(prototype.idRobotdisputeMyarc + '-gridData').setVisible(true);
        Ext.getCmp(prototype.idRobotdisputeMyarc + '-lbl-total').setVisible(true);
        Ext.getCmp(prototype.idRobotdisputeMyarc + '-lbl-total').setText('0');
        Ext.getCmp(prototype.idRobotdisputeMyarc + '-gridData').getStore().removeAll();

        Ext.getCmp(prototype.idRobotdisputeMyarc + '-lbl-totalDeta').setText('0');
        Ext.getCmp(prototype.idRobotdisputeMyarc + '-gridDetalle').getStore().removeAll();
        Ext.getCmp(prototype.idRobotdisputeMyarc + '-gridDetalle').setVisible(false);
        Ext.getCmp(prototype.idRobotdisputeMyarc + '-lbl-totalDeta').setVisible(false);
        Ext.getCmp(prototype.idRobotdisputeMyarc + '-btn-back').setVisible(false);
        Ext.getCmp(prototype.idRobotdisputeMyarc + '-btn-excel').setVisible(false);
        Ext.getCmp(prototype.idRobotdisputeMyarc + '-CmbArea').setVisible(false);
        Ext.getCmp(prototype.idRobotdisputeMyarc + '-Audit').setVisible(false);
    },
    searchform_detalle_Dispute: function (column, e, row, column, x, rowData) {
        var data = x.record.data;
        if (data.A3268STATO === 'A') {
            var gridData = Ext.getCmp(prototype.idRobotdisputeMyarc + '-gridData');
            var total = Ext.getCmp(prototype.idRobotdisputeMyarc + '-lbl-total');

            var gridDetalle = Ext.getCmp(prototype.idRobotdisputeMyarc + '-gridDetalle');
            var totalDeta = Ext.getCmp(prototype.idRobotdisputeMyarc + '-lbl-totalDeta');
            var back = Ext.getCmp(prototype.idRobotdisputeMyarc + '-btn-back');
            var excel = Ext.getCmp(prototype.idRobotdisputeMyarc + '-btn-excel');
            var CmbArea = Ext.getCmp(prototype.idRobotdisputeMyarc + '-CmbArea');
            var Audit = Ext.getCmp(prototype.idRobotdisputeMyarc + '-Audit');

            gridData.hide();
            total.hide();

            gridDetalle.show();
            totalDeta.show();
            back.show();
            excel.show();
            CmbArea.show();
            Audit.show();

            ///CARGANDO EL DETALLE DE LA GRTILLA 
            var CmbRobot = Ext.getCmp(prototype.idRobotdisputeMyarc + '-ComboRobot').getValue();
            var CmbArea = Ext.getCmp(prototype.idRobotdisputeMyarc + '-CmbArea').getValue();
            var Audit = Ext.getCmp(prototype.idRobotdisputeMyarc + '-Audit').getValue();
            this.bean2.IN_OPTION = '3';
            this.bean2.IN_DATEFROM = data.A3268FREGI;
            this.bean2.IN_ROBOT = CmbRobot;
            this.bean2.IN_AREA = CmbArea;
            this.bean2.IN_USER = Audit;
            Ext.getCmp(prototype.idRobotdisputeMyarc + '-gridDetalle').getStore().removeAll();
            Ext.getCmp(prototype.idRobotdisputeMyarc + '-gridDetalle').getStore().loadPage(1, {
                params: {
                    beanString: JSON.stringify(this.bean2)

                }, callback: function (records, operation, success) {
                    if (records.length !== 0) {
                        Ext.getCmp(prototype.idRobotdisputeMyarc + '-lbl-totalDeta').setText(records[0].data.A3268TOTALPAG);
                    } else {
                        Ext.getCmp(prototype.idRobotdisputeMyarc + '-lbl-totalDeta').setText('0');
                        global.Msg({msg: "Data not found.", icon: 2, fn: function () {
                            }});

                    }
                    //Ext.getCmp(prototype.idRobotdisputeMyarc + '-country').setValue(records[0].data.A3388TOTALPAG);

                }
            });


        } else {
            Ext.MessageBox.alert('PRAXIS', "Pending Execution or in Error");
            return;
        }

    },
    searchform_detalle_Dispute_excel: function () {
        var me = this;
        var CmbRobot = Ext.getCmp(prototype.idRobotdisputeMyarc + '-ComboRobot').getValue();
        var CmbArea = Ext.getCmp(prototype.idRobotdisputeMyarc + '-CmbArea').getValue();
        var Audit = Ext.getCmp(prototype.idRobotdisputeMyarc + '-Audit').getValue();
        me.bean3.IN_OPTION = '2';
        me.bean3.IN_DATEFROM = me.bean2.IN_DATEFROM;
        me.bean3.IN_ROBOT = CmbRobot;
        me.bean3.IN_AREA = CmbArea;
        me.bean3.IN_USER = Audit;
        if (me.bean2.IN_DATEFROM !== '') {
            me.exportExcel(prototype.url + '/getXLSX?beanString=' + encodeURI(JSON.stringify(me.bean3)));
        } else {
            Ext.MessageBox.alert('PRAXIS', "Select Filters");
            return;
        }
    },
    onColumnAmountRenderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = "background:#D5F4D5 !important";
        return Ext.util.Format.number(value, '0,000.00');
    },
    onRendererColumnOnPais: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = "font-weight:bold !important; color:blue !important; cursor: pointer !important; text-decoration: underline;";
        return '<span onclick="Ext.getCmp(prototype.idRobotdisputeMyarc + \'-Contenedor\').getController().OnDetail01(' + rowIndex + ');">' + value + '</span>'
    },
    imgSearch_clickHandler2: function () {
        var me = this;
        var CmbRobot = Ext.getCmp(prototype.idRobotdisputeMyarc + '-ComboRobot').getValue();
        var CmbArea = Ext.getCmp(prototype.idRobotdisputeMyarc + '-CmbArea').getValue();
        var Audit = Ext.getCmp(prototype.idRobotdisputeMyarc + '-Audit').getValue();
        me.bean3.IN_OPTION = '2';
        me.bean3.IN_DATEFROM = me.bean2.IN_DATEFROM;
        me.bean3.IN_ROBOT = CmbRobot;
        me.bean3.IN_AREA = CmbArea;
        me.bean3.IN_USER = Audit;
        Ext.getCmp(prototype.idRobotdisputeMyarc + '-gridDetalle').getStore().removeAll();
        Ext.getCmp(prototype.idRobotdisputeMyarc + '-gridDetalle').getStore().loadPage(1, {
            params: {
                beanString: JSON.stringify(me.bean3)

            }, callback: function (records, operation, success) {
                if (records.length !== 0) {
                    Ext.getCmp(prototype.idRobotdisputeMyarc + '-lbl-totalDeta').setText(records[0].data.A4139TOTALPAG);
                } else {
                    Ext.getCmp(prototype.idRobotdisputeMyarc + '-lbl-totalDeta').setText('0');
                    global.Msg({msg: "Data not found.", icon: 2, fn: function () {
                        }});

                }
                //Ext.getCmp(prototype.idRobotdisputeMyarc + '-country').setValue(records[0].data.A3388TOTALPAG);

            }
        });
    },
    OnDetail01: function (rowIndex) {
        var gridData = Ext.getCmp(prototype.idRobotdisputeMyarc + '-gridData');
        var total = Ext.getCmp(prototype.idRobotdisputeMyarc + '-lbl-total');
        var search1 = Ext.getCmp(prototype.idRobotdisputeMyarc + '-btn-search');
        var search2 = Ext.getCmp(prototype.idRobotdisputeMyarc + '-btn-search2');

        var gridDetalle = Ext.getCmp(prototype.idRobotdisputeMyarc + '-gridDetalle');
        var totalDeta = Ext.getCmp(prototype.idRobotdisputeMyarc + '-lbl-totalDeta');
        var back = Ext.getCmp(prototype.idRobotdisputeMyarc + '-btn-back');
        var excel = Ext.getCmp(prototype.idRobotdisputeMyarc + '-btn-excel');
        var CmbArea = Ext.getCmp(prototype.idRobotdisputeMyarc + '-CmbArea');
        var Audit = Ext.getCmp(prototype.idRobotdisputeMyarc + '-Audit');

        gridData.hide();
        total.hide();
        search1.hide();

        gridDetalle.show();
        totalDeta.show();
        back.show();
        excel.show();
        CmbArea.show();
        Audit.show();
        search2.show();

        ///CARGANDO EL DETALLE DE LA GRTILLA 
        var grid = Ext.getCmp(prototype.idRobotdisputeMyarc + '-gridData');
        var store = grid.getStore();
        var rec = store.getAt(rowIndex);

        var CmbRobot = Ext.getCmp(prototype.idRobotdisputeMyarc + '-ComboRobot').getValue();
        var CmbArea = Ext.getCmp(prototype.idRobotdisputeMyarc + '-CmbArea').getValue();
        var Audit = Ext.getCmp(prototype.idRobotdisputeMyarc + '-Audit').getValue();
        this.bean2.IN_OPTION = '2';
        this.bean2.IN_DATEFROM = rec.data.A4139FREGI;
        this.bean2.IN_ROBOT = CmbRobot;
        this.bean2.IN_AREA = CmbArea;
        this.bean2.IN_USER = Audit;
        Ext.getCmp(prototype.idRobotdisputeMyarc + '-gridDetalle').getStore().removeAll();
        Ext.getCmp(prototype.idRobotdisputeMyarc + '-gridDetalle').getStore().loadPage(1, {
            params: {
                beanString: JSON.stringify(this.bean2)

            }, callback: function (records, operation, success) {
                if (records.length !== 0) {
                    Ext.getCmp(prototype.idRobotdisputeMyarc + '-lbl-totalDeta').setText(records[0].data.A4139TOTALPAG);
                } else {
                    Ext.getCmp(prototype.idRobotdisputeMyarc + '-lbl-totalDeta').setText('0');
                    global.Msg({msg: "Data not found.", icon: 2, fn: function () {
                        }});

                }
                //Ext.getCmp(prototype.idRobotdisputeMyarc + '-country').setValue(records[0].data.A3388TOTALPAG);

            }
        });


    },

    onRendererColumnOnStatus: function (value, metaData, record, rowIndex, colIndex, store, view) {
        switch (String(record.get('A3268FLAG'))) {
            case 'Sin data':
                value = 'silver';
                break;
            case 'Sent to BSPLINK':
                value = 'green';
                break;
            default:
                value = 'red';
        }
        return '<i class="fas fa-circle" style="font-size: 16px; color:' + value + ';"></i>';
    },
});


