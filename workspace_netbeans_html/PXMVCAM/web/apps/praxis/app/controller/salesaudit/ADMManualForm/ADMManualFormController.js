
Ext.define('Ext.Praxis.controller.salesaudit.ADMManualForm.ADMManualFormController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ADMManualFormController',

    /**
     * Constructor
     */
    stack: [],
    bean: {},
    beanupdate: {},
    init: function (view) {
        var me = this;

    },

    /**
     * Se ejecuta luego de haber cargado todos los componentes
     */
    afterRender: function () {
        this.setStoresFilters();
        this.setStoresGrids();

        Ext.getCmp(prototype.id + '-pagginator-01').getCmpPaginator().on('beforechange', me.onPagingBeforeChange01, this);
    },
    onPagingBeforeChange01: function (obj, page, opts) {
        var me = this;
        obj.store.proxy.extraParams = me.bean;
    },
    onPaginationChkChange: function (obj, newValue, oldValue, eOpts) {
        Ext.getCmp(prototype.id + '-btn-search').fireEvent('click', {});
        if (!newValue) {
            Ext.getCmp(prototype.id + '-pagginator-01').disable();
        } else {
            Ext.getCmp(prototype.id + '-pagginator-01').enable();
        }
    },
    OnBeforeShow: function () {
        prototype.id = 'ADMManualForm';
        prototype.id01 = 'DataEntryADMManual';
        prototype.id1 = 'SeguimietoFormUnico';
        prototype.id5 = 'FormUnicoSeguimietoSubiArchivo';
        prototype.id6 = 'ADMSeguimietoSubiArchivo';
        prototype.url2 = CONTEXTPATH + '/ADMReport';
        prototype.url = CONTEXTPATH + '/ADMManualForm';
        prototype.widthContenedor = 1395;
        prototype.heightContenedor = 605;

    },
    setStoresGrids: function () {
        var grid01 = Ext.getCmp(prototype.id + '-gridData');
        var store01 = Ext.create('Ext.data.Store', {
            proxy: {
                type: 'ajax',
                url: prototype.url2 + '/SearchReportADM/',
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
        grid01.setStore(store01);
        Ext.getCmp(prototype.id + '-pagginator-01').setStore(store01);
    },
    onCmbSearchAfterRender: function (obj) {
        obj.setValue('');
    },
    onCmbSearchAfterRender2: function (obj) {
        obj.setValue('1');
    },
    onCmbSearchAfterRender3: function (obj) {
        obj.setValue('MA');
    },
    setStoresFilters: function () {
        var cmbSearch = Ext.getCmp(prototype.id + '-search-type');
        var cmbProcess = Ext.getCmp(prototype.id + '-CmbProcess');
        var cmbOrigin = Ext.getCmp(prototype.id + '-CmbOrigin');
        var CmbStatus = Ext.getCmp(prototype.id + '-CmbStatus');
        var CmbArea = Ext.getCmp(prototype.id + '-CmbArea');
        var CmbType = Ext.getCmp(prototype.id + '-CmbType');
        var CmbSource = Ext.getCmp(prototype.id + '-ComboSource');
        var CmbChannel = Ext.getCmp(prototype.id + '-ComboChannel');

        cmbSearch.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "5", "name": "ACCOUNTIG DATE"},
                {"code": "12", "name": "AGENCY"},
                {"code": "14", "name": "BSPLINK DATE"},
                {"code": "2", "name": "MEMO NUMBER"},
                //{"code": "13", "name": "PROCESSING DATE"},
                {"code": "1", "name": "SYSTEM DATE"},
                {"code": "4", "name": "TICKET"}
            ]
        }));

        cmbProcess.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "", "name": "ALL"},
                {"code": "ADM", "name": "ADM"},
                {"code": "ACM", "name": "ACM"},
                {"code": "NTD", "name": "DEBIT NOTE"},
                {"code": "NTC", "name": "CREDIT NOTE"},
                {"code": "FAD", "name": "DEBIT INVOICE"},
                {"code": "FAC", "name": "CREDIT INVOICE"}
            ]
        }));

        cmbOrigin.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "PR", "name": "AUTOMATIC"},
                {"code": "MA", "name": "MANUAL"},
                {"code": "QR", "name": "QUERYS"},
                {"code": "MS", "name": "MASSIVE"},
                {"code": "UP", "name": "UPFRONT"}
            ]
        }));

        CmbStatus.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "", "name": "ALL"},
                {"code": "A", "name": "APPROVED"},
                {"code": "F", "name": "ACCREDITED"},
                {"code": "Z", "name": "AUTHORIZED"},
                {"code": "B", "name": "ACM\ADM NA BSPlink\MM"},
                {"code": "L", "name": "ACM\ADM BSPLINK\MM"},
                {"code": "P", "name": "BILLED"},
                {"code": "I", "name": "BILLED GDS"},
                {"code": "C", "name": "CONDONED"},
                {"code": "U", "name": "CLEARED UP"},
                {"code": "X", "name": "CANCELED"},
                {"code": "D", "name": "DISPUTED"},
                {"code": "E", "name": "REJECTED DISPUTE"},
                {"code": "W", "name": "APPROVED DISPUTE"},
                {"code": "J", "name": "JUSTIFIED"},
                {"code": "O", "name": "IATA DISABLED"},
                {"code": "Y", "name": "PENDING"},
                {"code": "G", "name": "POST BILLING"},
                {"code": "Q", "name": "UNREGISTERED CLIENT"},
                {"code": "N", "name": "REJECTED"},
                {"code": "R", "name": "REAUDITED"}

            ]
        }));

        CmbArea.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "", "name": "ALL"},
                {"code": "PR", "name": "AUTOMATIC"},
                {"code": "QR", "name": "QUERYS"},
                {"code": "CR", "name": "CREDIT AND COBRANZA"},
                {"code": "VI", "name": "SALE INDIRECTA"},
                {"code": "DI", "name": "SALE DIRECTA"},
                {"code": "FR", "name": "FRANQUICIAS"},
                {"code": "CM", "name": "COMMISSION"},
                {"code": "RS", "name": "RESERVAS"}
            ]
        }));


        CmbType.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "", "name": "ALL"},
                {"code": "UP", "name": "UPFRONT"},
                {"code": "FC", "name": "FACT. COMMISSION"},
                {"code": "FA", "name": "FACT. NOT SEND"},
                {"code": "MP", "name": "MALAS PRACTICAS"},
                {"code": "FR", "name": "FRANQUICIAS"},
                {"code": "GR", "name": "GENERAL"},
                {"code": "BK", "name": "BACKEND"},
                {"code": "CA", "name": "CANCEL ADMS"}
            ]
        }));

        CmbSource.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "", "name": "ALL"},
                {"code": "BSP", "name": "BSP"},
                {"code": "ASR", "name": "ASR"},
                {"code": "ARC", "name": "ARC"},
                {"code": "MAN", "name": "MAN"}
            ]
        }));

        CmbChannel.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "", "name": "ALL"},
                {"code": "ATO", "name": "ATO"},
                {"code": "CCT", "name": "CCT"},
                {"code": "CTO", "name": "CTO"},
                {"code": "WEB", "name": "WEB"},
                {"code": "FRA", "name": "FRA"}
            ]
        }));

    },
    onCmbSourceSelect: function (obj, records, eOpts) {

        if (obj.getValue() === 'MAN' || obj.getValue() === 'ASR' || obj.getValue() === 'BSP') {
            Ext.getCmp(prototype.id + '-country2').setVisible(true);
        } else {
            Ext.getCmp(prototype.id + '-country2').setVisible(false);
        }
        switch (String(obj.getValue())) {
            case 'ASR':
                Ext.getCmp(prototype.id + '-ComboChannel').setVisible(true);
                break;
            case 'BSP':
            case 'ARC':
            case 'MAN':    
                Ext.getCmp(prototype.id + '-ComboChannel').setVisible(false);
                break;
                // boxFilter02.hide();
                // boxFilter02.setBorder(false)
        }

    },
    onCmbSearchChange: function (obj, records, eOpts) {
        var txtIATA = Ext.getCmp(prototype.id + '-txtIATA');
        var txtFilterDateFrom = Ext.getCmp(prototype.id + '-txtFilterDateFrom');
        var txtFilterDateTo = Ext.getCmp(prototype.id + '-txtFilterDateTo');
        var txtCia = Ext.getCmp(prototype.id + '-txtCia');
        var txtFrmaSerie = Ext.getCmp(prototype.id + '-txtFrmaSerie');
        var txtSeq = Ext.getCmp(prototype.id + '-txtSeq');
        var txtNumber = Ext.getCmp(prototype.id + '-txtNumber');
        var CmbProcess = Ext.getCmp(prototype.id + '-CmbProcess');
        var CmbOrigin = Ext.getCmp(prototype.id + '-CmbOrigin');
        var CmbStatus = Ext.getCmp(prototype.id + '-CmbStatus');
        var CmbArea = Ext.getCmp(prototype.id + '-CmbArea');
        var CmbType = Ext.getCmp(prototype.id + '-CmbType');
        var filter2 = Ext.getCmp(prototype.id + '-box-filter-02');
        var txtcountry = Ext.getCmp(prototype.id + '-country');
        var txtcountry2 = Ext.getCmp(prototype.id + '-country2');
        var campo_cantidad = Ext.getCmp(prototype.id + '-campo_cantidad');
        //campo_cantidad.hide();
        if (obj.getValue() === "1" || obj.getValue() === "5" || obj.getValue() === "13" || obj.getValue() === "14") {

            txtFilterDateFrom.show();
            txtFilterDateTo.show();
            CmbProcess.show();
            CmbOrigin.show();
            CmbStatus.show();
            CmbArea.show();
            CmbType.show();
            filter2.show();

            txtIATA.hide();
            txtCia.hide();
            txtFrmaSerie.hide();
            txtSeq.hide();
            txtNumber.hide();
            txtcountry.hide();

            Ext.getCmp(prototype.id + '-txtFrmaSerie').setValue('');
            Ext.getCmp(prototype.id + '-txtNumber').setValue('');
            Ext.getCmp(prototype.id + '-txtIATA').setValue('');

        } else if (obj.getValue() === "2" || obj.getValue() === "3") {
            if (obj.getValue() === "2") {
                txtcountry.show();
                Ext.getCmp(prototype.id + '-country').setValue('');
            } else {
                txtcountry.hide();
                Ext.getCmp(prototype.id + '-country').setValue('');
            }

            txtNumber.show();

            txtFilterDateFrom.hide();
            txtFilterDateTo.hide();
            CmbProcess.hide();
            CmbOrigin.hide();
            CmbStatus.hide();
            CmbArea.hide();
            CmbType.hide();
            filter2.hide();
            txtIATA.hide();
            txtCia.hide();
            txtFrmaSerie.hide();
            txtSeq.hide();

            Ext.getCmp(prototype.id + '-txtFrmaSerie').setValue('');
            Ext.getCmp(prototype.id + '-txtFilterDateFrom').setValue('');
            Ext.getCmp(prototype.id + '-txtFilterDateTo').setValue('');
            Ext.getCmp(prototype.id + '-txtIATA').setValue('');
        } else if (obj.getValue() === "4") {

            txtCia.show();
            txtFrmaSerie.show();
            txtSeq.show();

            txtFilterDateFrom.hide();
            txtFilterDateTo.hide();
            CmbProcess.hide();
            CmbOrigin.hide();
            CmbStatus.hide();
            CmbArea.hide();
            CmbType.hide();
            filter2.hide();
            txtIATA.hide();
            txtNumber.hide();
            txtcountry.hide();

            Ext.getCmp(prototype.id + '-txtNumber').setValue('');
            Ext.getCmp(prototype.id + '-txtFilterDateFrom').setValue('');
            Ext.getCmp(prototype.id + '-txtFilterDateTo').setValue('');
            Ext.getCmp(prototype.id + '-txtIATA').setValue('');
        } else if (obj.getValue() === "12") {

            txtIATA.show();

            txtCia.hide();
            txtFrmaSerie.hide();
            txtSeq.hide();
            txtcountry2.hide();

            txtFilterDateFrom.hide();
            txtFilterDateTo.hide();
            CmbProcess.show();
            CmbOrigin.show();
            CmbStatus.show();
            CmbArea.show();
            CmbType.show();
            filter2.hide();
            txtcountry.hide();

            txtNumber.hide();

            Ext.getCmp(prototype.id + '-txtNumber').setValue('');
            Ext.getCmp(prototype.id + '-txtFilterDateFrom').setValue('');
            Ext.getCmp(prototype.id + '-txtFilterDateTo').setValue('');
            Ext.getCmp(prototype.id + '-txtIATA').setValue('');
        } else {
            txtIATA.hide();

            txtCia.hide();
            txtFrmaSerie.hide();
            txtSeq.hide();
            txtcountry2.hide();

            txtFilterDateFrom.hide();
            txtFilterDateTo.hide();
            CmbProcess.hide();
            CmbOrigin.hide();
            CmbStatus.hide();
            CmbArea.hide();
            CmbType.hide();
            filter2.hide();
            txtcountry.hide();

            txtNumber.hide();
        }
    },
    onRendererColumnBase: function (value, metaData, record, rowIndex, colIndex, store, view) {
        switch (String(record.get('A2548BASE'))) {
            case 'PR':
                value = 'Proceso Regular';
                break;
            case 'UP':
                value = 'UpFront';
                break;
            case 'BF':
                value = 'Backend Flown';
                break;
            case 'BS':
                value = 'Backend Sale';
                break;
            case 'MS':
                value = 'Massive';
                break;
            case 'QR':
                value = 'Querys';
                break;
            case 'PR':
                value = 'Automatic';
                break;
            case 'MA':
                value = 'Manual';
                break;
        }
        metaData.tdAttr = 'data-qtip="' + value + '"';
        return value;
    },
    onRendererColumnStatus: function (value, metaData, record, rowIndex, colIndex, store, view) {
        var color = '#FFFFFF';
        switch (String(record.get('A2548FLAG'))) {
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
            case 'P':
                color = '#81F7BE';
                value = 'Billed';
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
            case 'E':
                color = '#F78181';
                value = 'Rejected dispute';
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
    onRendererColumnAttr: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.tdAttr = 'data-qtip="' + value + '"';
        return value;
    },
    onColumnAmountRenderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = "background:#D5F4D5 !important";
        return Ext.util.Format.number(value, '0,000.00');
    },
    onDetailClick: function (grid, rowIndex, colIndex) {
        var rec = grid.getStore().getAt(rowIndex);
        this.winDataEntry('SNCAMBIO', rec);
    },
    winDataEntry: function (action, rec) {
        action = action === null || action === undefined ? 'SNCAMBIO' : action;
        rec = rec === null || rec === undefined ? {} : rec;
        var win = new Ext.Praxis.view.screens.ScrFormUnico({
            params: {
                action: action,
                VP_PREME: rec.get('A2548PREME'),
                //rec: rec,
                url01: prototype.url2
            }
        });
        win.show();
    },
    onDetailDocumtClick: function (grid, rowIndex, colIndex) {
        var rec = grid.getStore().getAt(rowIndex);
        this.onSeguimietoClick('SMCAMBIO', rec);
    },
    onSeguimietoClick: function (action, rec) {
        action = action === null || action === undefined ? 'SMCAMBIO' : action;
        rec = rec === null || rec === undefined ? {} : rec;
        var win = new Ext.Praxis.view.salesaudit.ADMReportForm.FormUnicoSeguimieto({
            params: {
                action: action,
                rec: rec,
                url01: prototype.url2
            }
        });
        win.show();
    },
    imgSearch_clickHandler: function (obj, e) {

        var cmpo_cantidad = Ext.getCmp(prototype.id + '-campo_cantidad');
        if (obj !== true) {
            cmpo_cantidad.hide();
            Ext.getCmp(prototype.id + '-gridData').getStore().removeAll();
        }
        Ext.getCmp(prototype.id + '-lblCurrency1').setText("");
        Ext.getCmp(prototype.id + '-txtQtyAdm1').setValue(0);
        Ext.getCmp(prototype.id + '-txtAmtACM1').setValue(0);
        Ext.getCmp(prototype.id + '-txtAmtNTD1').setValue(0);
        Ext.getCmp(prototype.id + '-txtAmtNTC1').setValue(0);


        Ext.getCmp(prototype.id + '-txtAmtAdm1').setValue(0);
        Ext.getCmp(prototype.id + '-txtAmtAcm1').setValue(0);
        Ext.getCmp(prototype.id + '-txtAmtNtd1').setValue(0);
        Ext.getCmp(prototype.id + '-txtAmtNtc1').setValue(0);
        Ext.getCmp(prototype.id + '-lblRowsTotalADM').setText(0);


        var ComboBy = Ext.getCmp(prototype.id + '-search-type').getValue();

        var txtIATA = Ext.getCmp(prototype.id + '-txtIATA').getValue();
        var txtFilterDateFrom = Ext.getCmp(prototype.id + '-txtFilterDateFrom').getRawValue();
        var txtFilterDateTo = Ext.getCmp(prototype.id + '-txtFilterDateTo').getRawValue();
        var txtCia = Ext.getCmp(prototype.id + '-txtCia').getValue();
        var txtFrmaSerie = Ext.getCmp(prototype.id + '-txtFrmaSerie').getValue();
        var txtSeq = Ext.getCmp(prototype.id + '-txtSeq').getValue();
        var txtNumber = Ext.getCmp(prototype.id + '-txtNumber').getValue();
        var txtcountry = Ext.getCmp(prototype.id + '-country').getValue();
        var CmbProcess = Ext.getCmp(prototype.id + '-CmbProcess').getValue();
        var CmbOrigin = Ext.getCmp(prototype.id + '-CmbOrigin').getValue();
        var CmbStatus = Ext.getCmp(prototype.id + '-CmbStatus').getValue();
        var CmbArea = Ext.getCmp(prototype.id + '-CmbArea').getValue();
        var CmbType = Ext.getCmp(prototype.id + '-CmbType').getValue();
        var CombSource = Ext.getCmp(prototype.id + '-ComboSource').getValue();
        var CombChannel = Ext.getCmp(prototype.id + '-ComboChannel').getValue();
        var txtcountry2 = Ext.getCmp(prototype.id + '-country2').getValue();
        var txtCurrency = Ext.getCmp(prototype.id + '-Currency').getValue();
        var txtTourCode = Ext.getCmp(prototype.id + '-TourCode').getValue();
        var txtAudit = Ext.getCmp(prototype.id + '-Audit').getValue();




        if (ComboBy === '') {
            global.Msg({msg: 'Select Of By'});
            return;
        }
        if (ComboBy === "1" || ComboBy === "5" || ComboBy === "13" || ComboBy === "14") {
            if (txtFilterDateFrom !== '') {
                if (txtFilterDateTo === '') {
                    global.Msg({msg: 'Enter Date To'});
                    return;
                }
            }
            if (txtFilterDateTo !== '') {
                if (txtFilterDateFrom === '') {
                    global.Msg({msg: 'Enter Date From'});
                    return;
                }
            }
            if (txtFilterDateFrom !== '' && txtFilterDateTo !== '') {

                if (global.existeFecha(txtFilterDateFrom) !== '') {
                    Ext.MessageBox.alert('PRAXIS', global.existeFecha(txtFilterDateFrom), function (btn, text) {
                        if (btn === 'ok' || btn === 'cancel')
                            setTimeout("Ext.getCmp(prototype.id + '-txtFilterDateFrom').focus();", 100);
                    });
                    return;
                }

                if (global.existeFecha(txtFilterDateTo) !== '') {
                    Ext.MessageBox.alert('PRAXIS', global.existeFecha(txtFilterDateTo), function (btn, text) {
                        if (btn === 'ok' || btn === 'cancel')
                            setTimeout("Ext.getCmp(prototype.id + '-txtFilterDateTo').focus();", 100);
                    });
                    return;
                }
                if (Date.parse(Ext.getCmp(prototype.id + '-txtFilterDateFrom').getValue()) > Date.parse(Ext.getCmp(prototype.id + '-txtFilterDateTo').getValue())) {
                    Ext.MessageBox.alert('PRAXIS', "the starting date must be less than the end date", function (btn, text) {
                        if (btn === 'ok' || btn === 'cancel')
                            setTimeout("Ext.getCmp(prototype.id + '-txtFilterDateTo').focus();", 100);
                    });
                    return;
                }
            }
        }

        if (ComboBy === "2" || ComboBy === "3" || ComboBy === "4") {
            this.bean.COMBOBY = CmbProcess;
            this.bean.OPCIONTYPE = ComboBy;
            if (ComboBy === "2" || ComboBy === "3")
            {
                this.bean.NUMBERADM = txtNumber;
                this.bean.COUNTRY = txtcountry;
            } else {
                this.bean.NUMBERADM = '';
                this.bean.COUNTRY = '';
            }
            if (ComboBy === "4") {
                this.bean.CIA = txtCia;
                this.bean.FORMA = txtFrmaSerie.substring(0, 4);
                this.bean.SERIE = txtFrmaSerie.substring(4, 10);
                this.bean.SEQ = txtSeq;

            } else {
                this.bean.CIA = '';
                this.bean.FORMA = '';
                this.bean.SERIE = '';
            }
            this.bean.DATEFROM = '';
            this.bean.DATETO = '';
            this.bean.CURRENCY = '';
            this.bean.COMBOCHANNEL = '';
            this.bean.CHANNEL = '';
            this.bean.AUTMAN = '';
            this.bean.STATUS = '';
            this.bean.VP_TUORCODE = '';
            this.bean.VP_USER = '';
        }
        if (ComboBy === "1" || ComboBy === "5" || ComboBy === "13" || ComboBy === "14") {
            this.bean.OPCIONTYPE = ComboBy;
            this.bean.DATEFROM = txtFilterDateFrom;
            this.bean.DATETO = txtFilterDateTo;
            this.bean.COMBOBY = CmbProcess;
            this.bean.AUTMAN = CmbOrigin;
            this.bean.STATUS = CmbStatus;
            this.bean.COMBOCHANNEL = CombSource;
            this.bean.CHANNEL = CombChannel;
            this.bean.COUNTRY = txtcountry2;
            this.bean.CURRENCY = txtCurrency;
            this.bean.VP_TUORCODE = txtTourCode;
            this.bean.VP_USER = txtAudit;

            this.bean.CIA = '';
            this.bean.NUMBERADM = '';
            this.bean.FORMA = '';
            this.bean.SERIE = '';
            this.bean.SEQ = '';
        }
        if (ComboBy === "12") {
            this.bean.OPCIONTYPE = ComboBy;
            this.bean.NUMBERADM = txtIATA;
            this.bean.COMBOBY = CmbProcess;
            this.bean.AUTMAN = CmbOrigin;
            this.bean.STATUS = CmbStatus;
            this.bean.COMBOCHANNEL = CombSource;
            this.bean.CHANNEL = CombChannel;
            this.bean.COUNTRY = txtcountry2;
            this.bean.CURRENCY = txtCurrency;

            this.bean.CIA = '';
            this.bean.FORMA = '';
            this.bean.SERIE = '';
            this.bean.DATEFROM = '';
            this.bean.DATETO = '';
            this.bean.VP_TUORCODE = '';
            this.bean.VP_USER = '';
            this.bean.SEQ = '';
        }

        this.bean.VP_PREME = '';
        this.bean.VP_CNXPA = '';
        this.bean.CUPON = '';
        this.bean.TRNCU = '';
        this.bean.VP_TYPE = CmbType;
        this.bean.VP_AREA = CmbArea;
        /*
         * El valor obtenido del checkbox se interpreta de forma inversa para 
         * aprovechar el uso de la variable bexcel
         */
        this.bean.pexcel = Ext.getCmp(prototype.id + '-pagination').getValue() ? 0 : 1;

        this.SearchReportADM(this.bean, obj === true ? obj : false);
    },
    imgFilter_clickHandler: function () {
        var option = Ext.getCmp(prototype.id + '-contentFilter');
        if (option.isVisible())
            option.hide();
        else
            option.show();
    },
    imgExcel_clickHandler: function (obj, e) {
        this.imgSearch_clickHandler(true);
    },
    img_clickHandler_save_List: function () {
        var lstNew = new Array();
        var vlfte = '';
        var opflag;
        var grid = Ext.getCmp(prototype.id + '-gridData');
        if (grid.getSelectionModel().hasSelection()) {
            var selection = grid.getSelectionModel().getSelected();
            for (var i = 0; i < selection.length; i++) {
                var row = grid.getSelectionModel().getSelection()[i];
                if (i === 0) {
                    vlfte = Ext.String.trim(row.get('A2548FTE'));
                    lstNew.push(row.data);
                } else {
                    if (vlfte !== Ext.String.trim(row.get('A2548FTE'))) {
                        Ext.Msg.alert('.: PRAXIS :.', 'You cant not select more than one Source');
                        return;
                    } else {
                        opflag = '';
                        for (var w = 0; w < lstNew.length; w++) {
                            //items = lstNewList[i];
                            if (lstNew[w].A2548CNXPA === row.get('A2548CNXPA')) {
                                opflag = '1';
                            }
                        }
                        if (opflag !== '1') {
                            lstNew.push(row.data);
                        }
                    }
                }

            }
        } else {
            global.Msg({msg: 'You must select at least one record'});
            return;
        }

        if (lstNew.length > 0) {
            if (vlfte === 'ASR' || vlfte === 'MAN') {
                var win = new Ext.Praxis.view.salesaudit.ADMReportForm.ADMSeguimietoSubiArchivo({
                    params: {
                        rec: lstNew,
                        url01: prototype.url
                    }
                });
                win.show();
            } else {
                global.Msg({
                    msg: 'Are you sure to Save?',
                    icon: 3,
                    buttons: 3,
                    fn: function (btn) {
                        if (btn === 'yes') {
                            var mask = new Ext.LoadMask(Ext.getCmp(prototype.id + '-Contenedor'), {
                                msg: 'Please Wait....'
                            });
                            mask.show();
                            Ext.Ajax.request({
                                url: prototype.url + '/insertTKTManual/',
                                timeout: 60000000,
                                method: 'POST',
                                params: {beanlst: JSON.stringify(lstNew)},
                                success: function (response, options) {
                                    mask.hide();
                                    var res = Ext.JSON.decode(response.responseText);
                                    //console.log(res.data);
                                    var vp_icon = 0;
                                    if (res.data === 'RECORD INSERTED') {
                                        vp_icon = 1;
                                    }
                                    global.Msg({msg: res.data, icon: vp_icon, fn: function () {
                                            if (vp_icon === 1) {
                                                Ext.getCmp(prototype.id + '-Contenedor').getController().imgSearch_clickHandler();

                                            }


                                        }});
                                }
                            });
                        }

                    }
                });
            }

        } else {
            Ext.Msg.alert('.: PRAXIS :.', 'You must select at least one record');
            return;
        }
    },
    imgClear_clickHandler: function (obj, e) {

        Ext.getCmp(prototype.id + '-txtIATA').setValue('');
        Ext.getCmp(prototype.id + '-txtFilterDateFrom').setValue('');
        Ext.getCmp(prototype.id + '-txtFilterDateTo').setValue('');
        Ext.getCmp(prototype.id + '-txtFrmaSerie').setValue('');
        Ext.getCmp(prototype.id + '-txtNumber').setValue('');
        Ext.getCmp(prototype.id + '-country').setValue('');
        Ext.getCmp(prototype.id + '-CmbProcess').setValue('');
        Ext.getCmp(prototype.id + '-CmbOrigin').setValue('');
        Ext.getCmp(prototype.id + '-CmbStatus').setValue('');
        Ext.getCmp(prototype.id + '-CmbArea').setValue('');
        Ext.getCmp(prototype.id + '-CmbType').setValue('');
        Ext.getCmp(prototype.id + '-ComboSource').setValue('');
        Ext.getCmp(prototype.id + '-ComboChannel').setValue('');
        Ext.getCmp(prototype.id + '-country2').setValue('');
        Ext.getCmp(prototype.id + '-Currency').setValue('');
        Ext.getCmp(prototype.id + '-TourCode').setValue('');
        Ext.getCmp(prototype.id + '-Audit').setValue('');
        var campo_cantidad = Ext.getCmp(prototype.id + '-campo_cantidad');
        var box_filter_02 = Ext.getCmp(prototype.id + '-box-filter-02');
        var country = Ext.getCmp(prototype.id + '-country');
        campo_cantidad.hide();
        box_filter_02.hide();
        country.hide();
    },
    onSearchkey: function (f, e) {
        if (e.getKey() === e.ENTER) {
            this.imgSearch_clickHandler();
        }

    },
    SearchReportADM: function (bean, bExcel) {
        if (bExcel) {
            me.exportExcel(prototype.url + '/getXLSX?beanString=' + encodeURI(JSON.stringify(bean)));
        } else {
            var campo_cantidad = Ext.getCmp(prototype.id + '-campo_cantidad');
            campo_cantidad.hide();
            Ext.getCmp(prototype.id + '-gridData').getStore().removeAll();
            Ext.getCmp(prototype.id + '-gridData').getStore().loadPage(1, {
                params: bean,
                callback: function (records, operation, success) {
                    if (records.length !== 0) {

                        var Objtemp = records[0].data;
                        Ext.getCmp(prototype.id + '-lblRowsTotalADM').setText(Objtemp.A2548CATNMEMO);
                        if (bean.CURRENCY !== '') {
                            campo_cantidad.show();
                            Ext.getCmp(prototype.id + '-lblCurrency1').setText(Objtemp.A2548MDA);
                            Ext.getCmp(prototype.id + '-txtQtyAdm1').setValue(Objtemp.A2548CATNMEMO);
                            Ext.getCmp(prototype.id + '-txtAmtACM1').setValue(Objtemp.A2548CATNACM);
                            Ext.getCmp(prototype.id + '-txtAmtNTD1').setValue(Objtemp.A2548CATNNTD);
                            Ext.getCmp(prototype.id + '-txtAmtNTC1').setValue(Objtemp.A2548CATNNTC);


                            Ext.getCmp(prototype.id + '-txtAmtAdm1').setValue(Objtemp.A2548SUMACM);
                            Ext.getCmp(prototype.id + '-txtAmtAcm1').setValue(Objtemp.A2548SUMNTD);
                            Ext.getCmp(prototype.id + '-txtAmtNtd1').setValue(Objtemp.A2548SUMNTC);
                            Ext.getCmp(prototype.id + '-txtAmtNtc1').setValue(Objtemp.A2548SUMFAD);

                            //txtAmtFAD2.text=formatLngNumber.format(gridDataSource.getItemAt(0).A2548CATNFAD);
                            //txtAmtFAC2.text=formatLngNumber.format(gridDataSource.getItemAt(0).A2548CATNFAC);

                            //txtAmtFac2.text=formatDblNumber.format(gridDataSource.getItemAt(0).A2548SUMFAC);
                            //txtAmtAdm1.text=formatDblNumber.format(gridDataSource.getItemAt(0).A2548SUMADM);

                        } else {
                            campo_cantidad.hide();
                            Ext.getCmp(prototype.id + '-lblCurrency1').setText("");
                            Ext.getCmp(prototype.id + '-txtQtyAdm1').setValue(0);
                            Ext.getCmp(prototype.id + '-txtAmtACM1').setValue(0);
                            Ext.getCmp(prototype.id + '-txtAmtNTD1').setValue(0);
                            Ext.getCmp(prototype.id + '-txtAmtNTC1').setValue(0);


                            Ext.getCmp(prototype.id + '-txtAmtAdm1').setValue(0);
                            Ext.getCmp(prototype.id + '-txtAmtAcm1').setValue(0);
                            Ext.getCmp(prototype.id + '-txtAmtNtd1').setValue(0);
                            Ext.getCmp(prototype.id + '-txtAmtNtc1').setValue(0);
                        }
                        //win.setValue('txtTktTotal', Objtemp.A2548CANTIDAD);
                    } else {
                        Ext.getCmp(prototype.id + '-lblRowsTotalADM').setText('0');
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
    onUpperValue: function (field, newValue, oldValue) {
        field.setValue(newValue.toUpperCase());
    },
    onTextKeypress: function (obj, e, eOpts) {
        if (e.getKey() === e.ENTER) {
            this.imgSearch_clickHandler();
        }
    },
    imgSerech_clickHandler: function () {
        this.imgSearch_clickHandler(false);
    },
    onAddClick: function () {
        var win = new Ext.Praxis.view.salesaudit.ADMManualForm.DataEntryADMManual({
            params: {
                url01: prototype.url
            }
        });
        win.show();
    },
    onDeleteClick: function (grid, rowIndex, colIndex) {
        var me = this;
        var rec = grid.getStore().getAt(rowIndex);
        if (rec.get('A2548FLAG') === 'Y') {
            me.beanupdate.A2548TRNCO = rec.get('A2548TRNCO');
            me.beanupdate.A2548CNXPA = rec.get('A2548CNXPA');
            me.beanupdate.A2548PAIS = rec.get('A2548PAIS');
            if (me.beanupdate.A2548TRNCO.length !== '') {
                global.Msg({
                    msg: 'DELETE RECORD?',
                    icon: 3,
                    buttons: 3,
                    fn: function (btn) {
                        if (btn === 'yes') {
                            var mask = new Ext.LoadMask(Ext.getCmp(prototype.id + '-Contenedor'), {
                                msg: 'Please Wait....'
                            });
                            mask.show();
                            Ext.Ajax.request({
                                url: prototype.url + '/DeleteADMMANUAL/',
                                timeout: 60000000,
                                method: 'POST',
                                params: {beanString: JSON.stringify(me.beanupdate)},
                                success: function (response, options) {
                                    mask.hide();
                                    var res = Ext.JSON.decode(response.responseText);
                                    //console.log(res.data);
                                    var vp_icon = 0;
                                    if (res.data === 'RECORD INSERTED') {
                                        vp_icon = 1;
                                    }
                                    global.Msg({msg: res.data, icon: vp_icon, fn: function () {
                                            if (vp_icon === 1) {
                                                Ext.getCmp(prototype.id + '-Contenedor').getController().imgSearch_clickHandler();

                                            }


                                        }});
                                }
                            });
                        }

                    }
                });

            } else {
                Ext.Msg.alert('.: PRAXIS :.', 'You must select at least one record');
                return;
            }

        } else {
            Ext.Msg.alert('.: PRAXIS :.', 'THE TICKET MUST BE IN THE PENDING STATUS');
            return;
        }
        //rec.get('A2548FLAG'),
    }

});


