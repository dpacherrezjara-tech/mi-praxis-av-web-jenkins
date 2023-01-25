
Ext.define('Ext.Praxis.controller.sales.PolicyDeliveryLogForm.PolicyDeliveryLogFormController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.PolicyDeliveryLogFormController',

    /**
     * Constructor
     */
    beanTMP: {},
    init: function (view) {
        var me = this;

    },
    OnBeforeShow: function () {
        prototype.id = 'PolicyDeliveryLogForm';
        prototype.url = CONTEXTPATH + '/PolicyDeliveryLogForm';
        prototype.widthWindow = 1366;
        prototype.heightWindow = 768;
    },

    /**
     * Se ejecuta luego de haber cargado todos los componentes
     */
    afterRender: function () {
        var me = this;
        me.setStoresFilters();
        me.setStoresGrids();
        Ext.getCmp(prototype.id + '-pagginator-01').getCmpPaginator().on('beforechange', me.onPagingBeforeChange01, this);
    },
    setStoresFilters: function () {
        var cmbSearch = Ext.getCmp(prototype.id + '-search-type');
        var CmbModulo = Ext.getCmp(prototype.id + '-CmbModule');
        var CmbTipom = Ext.getCmp(prototype.id + '-CmbType');
        var cmbStatus = Ext.getCmp(prototype.id + '-CmbStatus');
        var CmbPoliza = Ext.getCmp(prototype.id + '-CmbPoliza');
        var CmbTypePoliza = Ext.getCmp(prototype.id + '-CmbTypePoliza');
        var CmbOracleStatus = Ext.getCmp(prototype.id + '-CmbOracleStatus');

        cmbSearch.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "", "name": "SELECTED"},
                {"code": "1", "name": "ACCOUNTING DATE"},
                {"code": "2", "name": "PROCESSING DATE"},
                {"code": "3", "name": "SYSTEM DATE"}
            ]
        }));
        CmbModulo.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "", "name": "ALL"},
                {"code": "SA", "name": "SALE"},
                {"code": "AUD", "name": "SALE AUDIT"},
                {"code": "DISC", "name": "DISC"},
                {"code": "FL", "name": "FLOWN"},
                {"code": "IXC", "name": "IXC"},
                {"code": "IXP", "name": "IXP"},
                {"code": "RGS", "name": "SALE REG."}

            ]
        }));

        CmbTipom.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "", "name": "ALL"},
                {"code": "REG", "name": "REGULAR"},
                {"code": "ADJ", "name": "ADJ ACCOUNTING"}
                //

            ]
        }));

        cmbStatus.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "", "name": "ALL"},
                {"code": "A", "name": "ACTIVE"},
                {"code": "E", "name": "INACTIVE"}
            ]
        }));

        CmbPoliza.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "", "name": "ALL"},
                {"code": "GL", "name": "GL"},
                {"code": "AR", "name": "AR"},
                {"code": "AP", "name": "AP"}
            ]
        }));

        CmbTypePoliza.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "", "name": "ALL"},
                {"code": "GL", "name": "GL"},
                {"code": "AR", "name": "AR"},
                {"code": "APL", "name": "AP LINES"},
                {"code": "APD", "name": "AP DISTRIBUTION"},
                {"code": "ARL", "name": "AR LINES"},
                {"code": "ARD", "name": "AR DISTRIBUTION"},
                {"code": "GLT", "name": "GL TAXES"},
                {"code": "GAP", "name": "PROVITIONAL GL OF THE AP"},
                {"code": "GAR", "name": "PROVITIONAL GL OF THE AR"},
                {"code": "GLT", "name": "GL TUAS"},
                {"code": "GLE", "name": "GL TUAS"},
                {"code": "GLR", "name": "GL  TKT AEREO"}
            ]
        }));
        
        CmbOracleStatus.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "", "name": "ALL"},
                {"code": "P", "name": "PENDING"},
                {"code": "N", "name": "IN PROCESS"},
                {"code": "Q", "name": "SENT"},
                {"code": "E", "name": "EXPIRED"},
                {"code": "X", "name": "ERROR"},
                {"code": "C", "name": "PROCESSED"}
            ]
        }));

    },
    setStoresGrids: function () {
        var grid00 = Ext.getCmp(prototype.id + '-grid');

        var store00 = Ext.create('Ext.data.Store', {
            storeId: prototype.id + '-store-grid00',
            pageSize: 20,
            proxy: {
                type: 'ajax',
                url: prototype.url + '/Search',
                timeout: 60000000,
                reader: {
                    type: 'json',
                    rootProperty: 'data',
                    totalProperty: 'total'
                }
            }
        });

        grid00.setStore(store00);

        Ext.getCmp(prototype.id + '-pagginator-01').setStore(store00);
    },
    onPagingBeforeChange01: function (obj, page, opts) {
        obj.store.proxy.extraParams = this.beanTMP;
    },
    onCmbSearchAfterRender: function (obj) {
        obj.setValue('');
    },
    onSearchkey: function (f, e) {
        if (e.getKey() === e.ENTER) {
            this.onSearchClick();
        }

    },
    onSearchClick: function (obj, e) {
        var me = this;

        var comboBy = String(Ext.getCmp(prototype.id + '-search-type').getValue());
        var IN_DATEFROM = Ext.getCmp(prototype.id + '-txtFilterDateFrom').getRawValue();
        var IN_DATETO = Ext.getCmp(prototype.id + '-txtFilterDateTo').getRawValue();
        var CmbModule = Ext.getCmp(prototype.id + '-CmbModule').getValue();
        var CmbType = Ext.getCmp(prototype.id + '-CmbType').getValue();
        var CmbPoliza = Ext.getCmp(prototype.id + '-CmbPoliza').getValue();
        var CmbTypePoliza = Ext.getCmp(prototype.id + '-CmbTypePoliza').getValue();
        var CmbStatus = Ext.getCmp(prototype.id + '-CmbStatus').getValue();
        var IN_NCAMP = Ext.getCmp(prototype.id + '-txtNCAMP').getValue();
        var IN_PRAXID = Ext.getCmp(prototype.id + '-txtPraxisID').getValue();
        var CmbOracleStatus = Ext.getCmp(prototype.id + '-CmbOracleStatus').getValue();
        if (comboBy === '') {
            Ext.Msg.alert('.: PRAXIS :.', 'SELECT Of By');
            return;
        }
        if (Ext.String.trim(Ext.getCmp(prototype.id + '-txtFilterDateTo').getRawValue()) === '') {
            Ext.Msg.alert('.: PRAXIS :.', 'Enter Date To');
            return;
        }
        if (Ext.String.trim(Ext.getCmp(prototype.id + '-txtFilterDateFrom').getRawValue()) === '') {
            Ext.Msg.alert('.: PRAXIS :.', 'Enter Date From');
            return;
        }
        if (Ext.String.trim(Ext.getCmp(prototype.id + '-txtFilterDateFrom').getRawValue()) !== '') {
            if (Ext.String.trim(Ext.getCmp(prototype.id + '-txtFilterDateTo').getRawValue()) === '') {
                Ext.Msg.alert('.: PRAXIS :.', 'Enter Date To');
                return;
            }
        }
        if (Ext.String.trim(Ext.getCmp(prototype.id + '-txtFilterDateTo').getRawValue()) !== '') {
            if (Ext.String.trim(Ext.getCmp(prototype.id + '-txtFilterDateFrom').getRawValue()) === '') {
                Ext.Msg.alert('.: PRAXIS :.', 'Enter Date From');
                return;
            }
        }
        me.beanTMP.IN_OPTION = comboBy;
        me.beanTMP.IN_DATEFROM = IN_DATEFROM;
        me.beanTMP.IN_DATETO = IN_DATETO;
        me.beanTMP.IN_NCAMP = IN_NCAMP;
        me.beanTMP.IN_PRAXID = IN_PRAXID;
        me.beanTMP.IN_MODULO = CmbModule;
        me.beanTMP.IN_TIPOM = CmbType;
        me.beanTMP.IN_POLIZ = CmbPoliza;
        me.beanTMP.IN_TPOLI = CmbTypePoliza;
        me.beanTMP.IN_STATO = CmbStatus;
        me.beanTMP.IN_ORACLESTATU = CmbOracleStatus;
        /*
         * El valor obtenido del checkbox se interpreta de forma inversa para 
         * aprovechar el uso de la variable bexcel
         */
        me.beanTMP.pexcel =0; //Ext.getCmp(prototype.id + '-pagination').getValue() ? 0 : 1;
        me.SearchReport(me.beanTMP, obj === true ? obj : false);

    },
    SearchReport: function (bean, bExcel) {
        var me = this;
        if (bExcel) {
            me.exportExcel(prototype.url + '/getXLSX?beanString=' + encodeURI(JSON.stringify(bean)));
        } else {
            Ext.getCmp(prototype.id + '-grid').getStore().removeAll();
            Ext.getCmp(prototype.id + '-grid').getStore().loadPage(1, {
                params: bean,
                callback: function (records, operation, success) {
                    if (records.length !== 0) {

                        var Objtemp = records[0].data;
                        //Ext.getCmp(prototype.id + '-lblRowsTotalADM').setText(Objtemp.A2548CATNMEMO);

                        //win.setValue('txtTktTotal', Objtemp.A2548CANTIDAD);
                    } else {
                        //Ext.getCmp(prototype.id + '-lblRowsTotalADM').setText('0');
                        global.Msg({msg: "Data not found.", icon: 2, fn: function () {
                            }});

                    }

                }
            });
        }
    },
    onRendererColumnStatus: function (value, metaData, record, rowIndex, colIndex, store, view) {
        var color = '#FFFFFF';
        switch (String(record.get('A4014STAT'))) {
            case 'A':
                color = '#F5A9F2';
                value = 'Approved';
                break;
            case 'U':
                color = '#D8D8D8';
                value = 'Cleared Up';
                break;
            case 'X':
                color = '#FF0000';
                value = 'Void';
                break;
            case 'C':
                color = '#F2F5A9';
                value = 'Condoned';
                break;
            case 'ACTIVE':
                color = '#81F7BE';
                value = 'ACTIVE';
                break;
            case 'I':
                color = '#BEF781';
                value = 'Billed GDS';
                break;
            case 'F':
                color = '#4DEC8E';
                value = 'Accredited';
                break;
            case 'Z':
                color = '#F8D169';
                value = 'Authorized';
                break;
            case 'R':
                color = '#F2A60D';
                value = 'Reaudited';
                break;
            case 'J':
                color = '#E3DAED';
                value = 'Justified';
                break;
            case 'D':
                color = '#FF9966';
                value = 'Disputed';
                break;
            case 'INACTIVE':
                color = '#F78181';
                value = 'INACTIVE';
                break;
            case 'W':
                color = '#F3EFB6';
                value = 'Approved dispute';
                break;
            case 'B':
                color = '#AAE3E8';
                value = 'Acm\Adm na BSPlink\MM';
                break;
            case 'Y':
                color = '#EFE41B';
                value = 'Pending';
                break;
            case 'N':
                color = '#E5B2B2';
                value = 'Rejected';
                break;
            case 'O':
                color = '#B791EF';
                value = 'IATA disabled';
                break;
            case 'Q':
                color = '#DC7633';
                value = 'Unregistered client';
                break;
            case 'L':
                color = '#FB63A2';
                value = 'Acm BSPlink/MM';
                break;

            case 'G':
                color = '#F3F781';
                value = 'PBD issued';
                break;
            case 'H':
                color = '#FE9A2E';
                value = 'Agreement not reached - to agent';
                break;
            case 'T':
                color = '#F781D8';
                value = 'Agree with airline';
                break;
            case 'K':
                color = '#A9F5BC';
                value = 'Agree with Agent';
                break;
                //{"code": "G", "name": "POST BILLING"},
        }

        metaData.tdAttr = 'data-qtip="' + value + '"';
        metaData.style = "font-weight:bold !important; background:" + color + " !important";
        return value;
    },
    
    /*onRendererColumnStatus: function(value, metaData, record, rowIndex, colIndex, store, view){
        switch( String(record.get('A4014STAT')) ){
            case 'D':
                value = 'silver';
            break;
            case 'ACTIVE':
                value = 'green';
            break;
            default:
                value = 'red';
        }
        return '<i class="fas fa-circle" style="font-size: 16px; color:' + value + ';"></i>';
    },*/
    onRendererColumnAttr: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.tdAttr = 'data-qtip="' + value + '"';
        return value;
    },
    onRendererColumnOnPais: function(value, metaData, record, rowIndex, colIndex, store, view){
        metaData.style = "font-weight:bold !important; color:blue !important; cursor: pointer !important; text-decoration: underline;";
        return '<span onclick="Ext.getCmp(prototype.id + \'-Contenedor\').getController().searchform_detalle(' + rowIndex + ');">' + value + '</span>'
    },
    searchform_detalle: function(rowIndex) {
        var grid = Ext.getCmp(prototype.id + '-gridData');
        var store = grid.getStore();
        var rec = store.getAt(rowIndex); 
        alert('En Construción');
        /*if (rec.data.A3388FINA === 'A') {
            Ext.getCmp(prototype.id + '-gridData').setVisible(false);
            Ext.getCmp(prototype.id + '-lbl-total').setVisible(false);

            Ext.getCmp(prototype.id + '-gridDetalle').setVisible(true);
            Ext.getCmp(prototype.id + '-lbl-totalDeta').setVisible(true);
            Ext.getCmp(prototype.id + '-btn-back').setVisible(true);
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
            Ext.MessageBox.alert('PRAXIS', "Pending Execution or in Error");
            return;
        }*/

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
    onTextKeypress: function (obj, e, eOpts) {
        if (e.getKey() === e.ENTER) {
            this.imgSearch_clickHandler();
        }
    },
    imgSerech_clickHandler: function () {
        this.imgSearch_clickHandler(false);
    }

});

