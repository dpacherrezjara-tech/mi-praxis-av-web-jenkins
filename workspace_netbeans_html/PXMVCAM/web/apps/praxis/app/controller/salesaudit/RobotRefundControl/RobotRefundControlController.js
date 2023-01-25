
Ext.define('Ext.Praxis.controller.salesaudit.RobotRefundControl.RobotRefundControlController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.RobotRefundControlController',
    bean: {},
    bean2: {},
    /**
     * Constructor
     */

    init: function(view) {
        var me = this;
        this.setStoresFilters();

    },
    OnBeforeShow: function(){
        prototype.id = 'RobotRefundControl';
        prototype.url = CONTEXTPATH + '/RobotRefundControl';
    },
    /**
     * Se ejecuta luego de haber cargado todos los componentes
     */
    afterRender: function() {
        // alert('Controlador cargado correctamente')
        this.setStores();
    },
    onRendererColumnOnTime: function(value, metaData, record, rowIndex, colIndex, store, view){
        switch( String(record.get('A3388FINA')) ){
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
    setStores: function() {
        var grid01 = Ext.getCmp(prototype.id + '-gridData');
        var grid02 = Ext.getCmp(prototype.id + '-gridDetalle');

        var store01 = Ext.create('Ext.data.Store', {
            proxy: {
                type: 'ajax',
                url: prototype.url + '/searchRefundControl/',
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
                url: prototype.url + '/SearchRefundDetail/',
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
                {"code": "J", "name": "PREVIOUSLY DOWNLOADED"},
                {"code": "A", "name": "PROCESSED CORRECTLY"},
                {"code": "C", "name": "PASSWORD EXPIRED"},
                {"code": "N", "name": "USER NOT ALLOWED"},
                {"code": "D", "name": "WITHOUT DATA"}                
            ]
        }));
        cmbRobot.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "1", "name": "DOWNLOAD OF RFND"},
                {"code": "2", "name": "SEND RFND WORKED"}
            ]
        }));
    },
    onCmbSearchChange: function(obj, newValue, oldValue, eOpts) {
        var txtIATA = Ext.getCmp(prototype.id + '-txtIATA');
    },
    onCmbSearchAfterRender: function(obj) {
        obj.setValue('1');
    },
    onCmbRobotAfterRender: function(obj) {
        obj.setValue('1');
    },
    onCmbStatusAfterRender: function(obj) {
        obj.setValue('');
    },
    onSearchkey: function(f, e) {
        if (e.getKey() == e.ENTER) {
            this.imgSearch_clickHandler();
        }

    },
    onchange: function(field, newValue, oldValue) {
         field.setValue(newValue.toUpperCase());
    },
    onBackClick: function(obj, e) {
        Ext.getCmp(prototype.id + '-gridData').setVisible(true);
        Ext.getCmp(prototype.id + '-lbl-total').setVisible(true);
        Ext.getCmp(prototype.id + '-btn-excel').setVisible(true);

        //Ext.getCmp(prototype.id + '-lbl-total').setText('0');
        Ext.getCmp(prototype.id + '-gridDetalle').setVisible(false);
        Ext.getCmp(prototype.id + '-lbl-totalDeta').setVisible(false);
        Ext.getCmp(prototype.id + '-btn-back').setVisible(false);
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
        //Ext.getCmp(prototype.id + '-gridData').getStore().removeAll();
        //datos capturados del texto
        this.bean.IN_OPTION = cmbsearch;
        this.bean.IN_DATEFROM = txtDateFrom;
        this.bean.IN_DATETO = txtDateTo;
        this.bean.IN_STATUS = CmbStatus;
        this.bean.IN_COUNTRY = txtcountry;
        this.bean.IN_ROBOT = CmbRobot;
        this.bean.IN_USER = '';
        this.SearchReportRFND(this.bean, obj === true ? obj : false);

    },
    SearchReportRFND: function(bean, bExcel) {

        if (bExcel) {
            me.exportExcel(prototype.url + '/getXLSX?beanString=' + encodeURI(JSON.stringify(bean)));
        } else {
            Ext.getCmp(prototype.id + '-gridData').getStore().removeAll();
            Ext.getCmp(prototype.id + '-gridData').getStore().loadPage(1, {
                params: {
                    beanString: JSON.stringify(bean)
                            //beanString: bean

                }, callback: function(records, operation, success) {
                    if (records.length != 0) {
                        Ext.getCmp(prototype.id + '-lbl-total').setText(records[0].data.A3388TOTALPAG);
                    } else {
                        Ext.getCmp(prototype.id + '-lbl-total').setText('0');
                        global.Msg({msg: "Data not found.", icon: 2, fn: function() {
                            }});

                    }

                }
            });
        }


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
        this.imgSearch_clickHandler(true);
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
    },
    onRendererColumnOnPais: function(value, metaData, record, rowIndex, colIndex, store, view){
        metaData.style = "font-weight:bold !important; color:blue !important; cursor: pointer !important; text-decoration: underline;";
        return '<span onclick="Ext.getCmp(prototype.id + \'-Contenedor\').getController().searchform_detalle_RFND(' + rowIndex + ');">' + value + '</span>'
    },
    searchform_detalle_RFND: function(rowIndex) {
        var grid = Ext.getCmp(prototype.id + '-gridData');
        var store = grid.getStore();
        var rec = store.getAt(rowIndex); 
        if (rec.data.A3388FINA === 'A') {
            Ext.getCmp(prototype.id + '-gridData').setVisible(false);
            Ext.getCmp(prototype.id + '-lbl-total').setVisible(false);

            Ext.getCmp(prototype.id + '-gridDetalle').setVisible(true);
            Ext.getCmp(prototype.id + '-lbl-totalDeta').setVisible(true);
            Ext.getCmp(prototype.id + '-btn-back').setVisible(true);
            Ext.getCmp(prototype.id + '-btn-excel').setVisible(false);
            ///CARGANDO EL DETALLE DE LA GRTILLA 
            var CmbRobot = Ext.getCmp(prototype.id + '-ComboRobot').getValue();
            this.bean2.IN_OPTION = '3';
            this.bean2.IN_DATEFROM = rec.data.A3388FREGI;
            this.bean2.IN_COUNTRY = rec.data.A3388PAIS;
            this.bean2.IN_ROBOT = CmbRobot;
            this.bean2.IN_USER = '';
            Ext.getCmp(prototype.id + '-gridDetalle').getStore().removeAll();
            Ext.getCmp(prototype.id + '-gridDetalle').getStore().loadPage(1, {
                params: {
                    beanString: JSON.stringify(this.bean2)
                            //beanString: bean

                }, callback: function(records, operation, success) {
                    if (records.length != 0) {
                        Ext.getCmp(prototype.id + '-lbl-totalDeta').setText(records[0].data.A3388TOTALPAG);
                    } else {
                        Ext.getCmp(prototype.id + '-lbl-totalDeta').setText('0');
                        global.Msg({msg: "Data not found.", icon: 2, fn: function() {
                            }});

                    }
                    //Ext.getCmp(prototype.id + '-country').setValue(records[0].data.A3388TOTALPAG);

                }
            });


        } else {
            Ext.getCmp(prototype.id + '-gridData').setVisible(false);
            Ext.getCmp(prototype.id + '-lbl-total').setVisible(false);

            Ext.getCmp(prototype.id + '-gridDetalle').setVisible(true);
            Ext.getCmp(prototype.id + '-lbl-totalDeta').setVisible(true);
            Ext.getCmp(prototype.id + '-btn-back').setVisible(true);
            ///CARGANDO EL DETALLE DE LA GRTILLA 
            var CmbRobot = Ext.getCmp(prototype.id + '-ComboRobot').getValue();
            this.bean2.IN_OPTION = '5';
            this.bean2.IN_DATEFROM = rec.data.A3388FREGI;
            this.bean2.IN_COUNTRY = rec.data.A3388PAIS;
            this.bean2.IN_ROBOT = CmbRobot;
            this.bean2.IN_USER = '';
            Ext.getCmp(prototype.id + '-gridDetalle').getStore().removeAll();
            Ext.getCmp(prototype.id + '-gridDetalle').getStore().loadPage(1, {
                params: {
                    beanString: JSON.stringify(this.bean2)
                            //beanString: bean

                }, callback: function(records, operation, success) {
                    if (records.length !== 0) {
                        Ext.getCmp(prototype.id + '-lbl-totalDeta').setText(records[0].data.A3388TOTALPAG);
                    } else {
                        Ext.getCmp(prototype.id + '-lbl-totalDeta').setText('0');
                        global.Msg({msg: "Data not found.", icon: 2, fn: function() {
                            }});

                    }
                    //Ext.getCmp(prototype.id + '-country').setValue(records[0].data.A3388TOTALPAG);

                }
            });
            //Ext.MessageBox.alert('PRAXIS', "Pending Execution or in Error");
            //return;
        }

    },
    onCmbStatusChange: function(obj, newValue, oldValue, eOpts) {

    },


});

