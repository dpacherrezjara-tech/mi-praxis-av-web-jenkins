
Ext.define('Ext.Praxis.controller.salesaudit.RobotDisputeControl.RobotDisputeControlController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.RobotDisputeControlController',
    bean: {},
    bean2: {},
    /**
     * Constructor
     */

    init: function(view) {
        var me = this;
        this.setStoresFilters();

    },
    /**
     * Se ejecuta luego de haber cargado todos los componentes
     */
    afterRender: function() {
        this.setStores();
    },
    setStores: function() {
        var grid01 = Ext.getCmp(prototype.id + '-gridData');
        var grid02 = Ext.getCmp(prototype.id + '-gridDetalle');

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
            }//,
            //autoLoad: true,
            //pageSize: 25
        });

        var store02 = Ext.create('Ext.data.Store', {
            proxy: {
                type: 'ajax',
                url: prototype.url + '/SearchDebitosDetail/',
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
    setStoresFilters: function() {
        var cmbSearch = Ext.getCmp(prototype.id + '-search-type');
        var cmbRobot = Ext.getCmp(prototype.id + '-ComboRobot');
        var cmbStatus = Ext.getCmp(prototype.id + '-CmbStatus');
        var cmbArea = Ext.getCmp(prototype.id + '-CmbArea');

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
                {"code": "DI", "name": "Venta Directa"},
                {"code": "FR", "name": "Franquicias"},
                {"code": "CM", "name": "Comisiones"},
                {"code": "UP", "name": "UpFront"}
            ]
        }));
    },
    onchange: function(field, newValue, oldValue) {
        field.setValue(newValue.toUpperCase());
    },
    onCmbSearchAfterRender: function(obj) {
        obj.setValue('1');
    },
    onSearchkey: function(f, e) {
        if (e.getKey() == e.ENTER) {
            this.imgSearch_clickHandler();
        }

    },
    onCmbRobotAfterRender: function(obj) {
        obj.setValue('1');
    },
    onCmbStatusAfterRender: function(obj) {
        obj.setValue('');
    },
    onCmbAreaAfterRender: function(obj) {
        obj.setValue('');
    },
    onBackClick: function(obj, e) {
        Ext.getCmp(prototype.id + '-gridData').setVisible(true);
        Ext.getCmp(prototype.id + '-lbl-total').setVisible(true);

        Ext.getCmp(prototype.id + '-lbl-total').setText('0');
        Ext.getCmp(prototype.id + '-gridDetalle').setVisible(false);
        Ext.getCmp(prototype.id + '-lbl-totalDeta').setVisible(false);
        Ext.getCmp(prototype.id + '-btn-back').setVisible(false);
        Ext.getCmp(prototype.id + '-btn-excel').setVisible(false);
    },
    imgSearch_clickHandler: function(obj, records, eOpts) {
        var cmbsearch = Ext.getCmp(prototype.id + '-search-type').getValue();
        var txtDateFrom = Ext.getCmp(prototype.id + '-txtFilterDateFrom').getRawValue();
        var txtDateTo = Ext.getCmp(prototype.id + '-txtFilterDateTo').getRawValue();
        var txtcountry = Ext.getCmp(prototype.id + '-country').getValue();
        var CmbRobot = Ext.getCmp(prototype.id + '-ComboRobot').getValue();
        var CmbStatus = Ext.getCmp(prototype.id + '-CmbStatus').getValue();
        if (cmbsearch == '') {
            Ext.MessageBox.alert('PRAXIS', "Select Search Type", function(btn, text) {
                if (btn == 'ok' || btn == 'cancel')
                    setTimeout("Ext.getCmp(prototype.id + '-search-type').focus();", 100);
            });
            return;
        }
        if (txtDateFrom == '') {
            Ext.MessageBox.alert('PRAXIS', "Enter Date From", function(btn, text) {
                if (btn == 'ok' || btn == 'cancel')
                    setTimeout("Ext.getCmp(prototype.id + '-txtFilterDateFrom').focus();", 100);
            });
            return;
        }
        if (txtDateTo == '') {
            Ext.MessageBox.alert('PRAXIS', "Enter Date To", function(btn, text) {
                if (btn == 'ok' || btn == 'cancel')
                    setTimeout("Ext.getCmp(prototype.id + '-txtFilterDateTo').focus();", 100);
            });
            return;
        }
        if (txtDateFrom != '' && txtDateTo != '') {

            if (global.existeFecha(txtDateFrom) != '') {
                Ext.MessageBox.alert('PRAXIS', global.existeFecha(txtDateFrom), function(btn, text) {
                    if (btn == 'ok' || btn == 'cancel')
                        setTimeout("Ext.getCmp(prototype.id + '-txtFilterDateFrom').focus();", 100);
                });
                return;
            }

            if (global.existeFecha(txtDateTo) != '') {
                Ext.MessageBox.alert('PRAXIS', global.existeFecha(txtDateTo), function(btn, text) {
                    if (btn == 'ok' || btn == 'cancel')
                        setTimeout("Ext.getCmp(prototype.id + '-txtFilterDateTo').focus();", 100);
                });
                return;
            }
            if (Date.parse(Ext.getCmp(prototype.id + '-txtFilterDateFrom').getValue()) > Date.parse(Ext.getCmp(prototype.id + '-txtFilterDateTo').getValue())) {
                Ext.MessageBox.alert('PRAXIS', "the starting date must be less than the end date", function(btn, text) {
                    if (btn == 'ok' || btn == 'cancel')
                        setTimeout("Ext.getCmp(prototype.id + '-txtFilterDateTo').focus();", 100);
                });
                return;
            }
        }
        Ext.getCmp(prototype.id + '-gridData').getStore().removeAll();
        //datos capturados del texto
        this.bean.IN_OPTION = cmbsearch;
        this.bean.IN_DATEFROM = txtDateFrom;
        this.bean.IN_DATETO = txtDateTo;
        this.bean.IN_STATUS = CmbStatus;
        this.bean.IN_COUNTRY = txtcountry;
        this.bean.IN_ROBOT = CmbRobot;
        this.bean.IN_AREA = "";
        this.bean.IN_USER = "";
        this.SearchReportDispute(this.bean, obj === true ? obj : false);

    },
    SearchReportDispute: function(bean, bExcel) {


        Ext.getCmp(prototype.id + '-gridData').getStore().removeAll();
        Ext.getCmp(prototype.id + '-gridData').getStore().loadPage(1, {
            params: {
                beanString: JSON.stringify(bean)
                        //beanString: bean

            }, callback: function(records, operation, success) {
                if (records.length != 0) {
                    Ext.getCmp(prototype.id + '-lbl-total').setText(records[0].data.A3268TOTALPAG);
                } else {
                    Ext.getCmp(prototype.id + '-lbl-total').setText('0');
                    global.Msg({msg: "Data not found.", icon: 2, fn: function() {
                        }});

                }

            }
        });



    },
    exportExcel: function(_path) {
        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: 'Download Excel ?',
            buttons: Ext.MessageBox.OKCANCEL,
            scope: this,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function(btn) {
                if (btn === 'ok') {
                    global.getFile(_path);
                }
            }
        });
    },
    onExcelClick: function(obj, e) {
        this.searchform_detalle_Dispute_excel();
    },
    onFilterClick: function() {
        var option = Ext.getCmp(prototype.id + '-contentFilter');
        if (option.isVisible())
            option.hide();
        else
            option.show();
    },
    onClearClick: function(obj, e) {
        Ext.getCmp(prototype.id + '-gridData').setVisible(true);
        Ext.getCmp(prototype.id + '-lbl-total').setVisible(true);
        Ext.getCmp(prototype.id + '-lbl-total').setText('0');
        Ext.getCmp(prototype.id + '-gridData').getStore().removeAll();

        Ext.getCmp(prototype.id + '-lbl-totalDeta').setText('0');
        Ext.getCmp(prototype.id + '-gridDetalle').getStore().removeAll();
        Ext.getCmp(prototype.id + '-gridDetalle').setVisible(false);
        Ext.getCmp(prototype.id + '-lbl-totalDeta').setVisible(false);
        Ext.getCmp(prototype.id + '-btn-back').setVisible(false);
        Ext.getCmp(prototype.id + '-btn-excel').setVisible(false);
        Ext.getCmp(prototype.id + '-CmbArea').setVisible(false);
        Ext.getCmp(prototype.id + '-Audit').setVisible(false);
    },
    searchform_detalle_Dispute: function(column, e, row, column, x, rowData) {
        var data = x.record.data;
        if (data.A3268STATO == 'A') {
            Ext.getCmp(prototype.id + '-gridData').setVisible(false);
            Ext.getCmp(prototype.id + '-lbl-total').setVisible(false);

            Ext.getCmp(prototype.id + '-gridDetalle').setVisible(true);
            Ext.getCmp(prototype.id + '-lbl-totalDeta').setVisible(true);
            Ext.getCmp(prototype.id + '-btn-back').setVisible(true);
            Ext.getCmp(prototype.id + '-btn-excel').setVisible(true);
            Ext.getCmp(prototype.id + '-CmbArea').setVisible(true);
            Ext.getCmp(prototype.id + '-Audit').setVisible(true);
            ///CARGANDO EL DETALLE DE LA GRTILLA 
            var CmbRobot = Ext.getCmp(prototype.id + '-ComboRobot').getValue();
            var CmbArea = Ext.getCmp(prototype.id + '-CmbArea').getValue();
            var Audit = Ext.getCmp(prototype.id + '-Audit').getValue();
            this.bean2.IN_OPTION = '3';
            this.bean2.IN_DATEFROM = data.A3268FREGI;
            this.bean2.IN_COUNTRY = data.A3268PAIS;
            this.bean2.IN_ROBOT = CmbRobot;
            this.bean2.IN_AREA = CmbArea;
            this.bean2.IN_USER = Audit;
            Ext.getCmp(prototype.id + '-gridDetalle').getStore().removeAll();
            Ext.getCmp(prototype.id + '-gridDetalle').getStore().loadPage(1, {
                params: {
                    beanString: JSON.stringify(this.bean2)

                }, callback: function(records, operation, success) {
                    if (records.length != 0) {
                        Ext.getCmp(prototype.id + '-lbl-totalDeta').setText(records[0].data.A3268TOTALPAG);
                    } else {
                        Ext.getCmp(prototype.id + '-lbl-totalDeta').setText('0');
                        global.Msg({msg: "Data not found.", icon: 2, fn: function() {
                            }});

                    }
                    //Ext.getCmp(prototype.id + '-country').setValue(records[0].data.A3388TOTALPAG);

                }
            });


        } else {
            Ext.MessageBox.alert('PRAXIS', "Pending Execution or in Error");
            return;
        }

    },
    searchform_detalle_Dispute_excel: function() {
        if(this.bean2.IN_COUNTRY!=''){
            me.exportExcel(prototype.url + '/getXLSX?beanString=' + encodeURI(JSON.stringify(this.bean2)));
        }else{
            Ext.MessageBox.alert('PRAXIS', "Select Country");return;
        }
    }
});

