
Ext.define('Ext.Praxis.controller.salesaudit.DownloadADMACMReportForm.DownloadADMACMReportFormController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.DownloadADMACMReportFormController',
    stack: [],
    bean: {},
    init: function (view) {
        var me = this;

    },

    /**
     * Se ejecuta luego de haber cargado todos los componentes
     */
    afterRender: function () {
        this.setStoresFilters();
        this.setStoresGrids();
    },
    OnBeforeShow: function () {
        prototype.id = 'DownloadADMACMReportForm';
        prototype.url = CONTEXTPATH + '/DownloadADMACMReportForm';
        prototype.widthWindow = 1366;
        prototype.heightWindow = 768;
    },
    setStoresGrids: function () {
        var grid01 = Ext.getCmp(prototype.id + '-gridData');
        var store01 = Ext.create('Ext.data.Store', {
            proxy: {
                type: 'ajax',
                url: prototype.url + '/Search/',
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
    },
    onCmbSearchAfterRender: function (obj) {
        obj.setValue('');
    },
    onCmbSourceAfterRender: function (obj) {
        obj.setValue('ASR');
    },
    setStoresFilters: function () {
        var cmbSearch = Ext.getCmp(prototype.id + '-search-type');
        var cmbOrigin = Ext.getCmp(prototype.id + '-CmbOrigin');
        var CmbStatus = Ext.getCmp(prototype.id + '-CmbStatus');
        var CmbArea = Ext.getCmp(prototype.id + '-CmbArea');
        var CmbSource = Ext.getCmp(prototype.id + '-ComboSource');
        var CmbChannel = Ext.getCmp(prototype.id + '-ComboChannel');

        cmbSearch.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "", "name": "SELECTED"},
                {"code": "5", "name": "ACCOUNTIG DATE"},
                {"code": "12", "name": "AGENCY"},
                {"code": "14", "name": "BSPLINK DATE"},
                {"code": "2", "name": "MEMO NUMBER"},
                {"code": "13", "name": "PROCESSING DATE"},
                {"code": "1", "name": "SYSTEM DATE"},
                {"code": "4", "name": "TICKET"}
            ]
        }));

        cmbOrigin.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "", "name": "ALL"},
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


        CmbSource.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "ASR", "name": "ASR"},
                {"code": "ARC", "name": "ARC"},
                {"code": "BSP", "name": "BSP"}
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

        if (obj.getValue() === 'ASR' || obj.getValue() === 'BSP') {
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
                Ext.getCmp(prototype.id + '-ComboChannel').setVisible(false);
                break;
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
        var CmbOrigin = Ext.getCmp(prototype.id + '-CmbOrigin');
        var CmbStatus = Ext.getCmp(prototype.id + '-CmbStatus');
        var CmbArea = Ext.getCmp(prototype.id + '-CmbArea');
        var filter2 = Ext.getCmp(prototype.id + '-box-filter-02');
        var txtcountry = Ext.getCmp(prototype.id + '-country');
        var txtcountry2 = Ext.getCmp(prototype.id + '-country2');
        //campo_cantidad.hide();
        if (obj.getValue() === "1" || obj.getValue() === "5" || obj.getValue() === "13" || obj.getValue() === "14") {

            txtFilterDateFrom.show();
            txtFilterDateTo.show();
            CmbOrigin.show();
            CmbStatus.show();
            CmbArea.show();
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
            CmbOrigin.hide();
            CmbStatus.hide();
            CmbArea.hide();
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
            CmbOrigin.hide();
            CmbStatus.hide();
            CmbArea.hide();
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
            CmbOrigin.show();
            CmbStatus.show();
            CmbArea.show();
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
            CmbOrigin.hide();
            CmbStatus.hide();
            CmbArea.hide();
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
                value = 'Rejecte disputed';
                break;
            case 'W':
                color = '#F3EFB6';
                value = 'Approve disputed';
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
    imgSearch_clickHandler: function (obj, e) {
        var me = this;
        var ComboBy = Ext.getCmp(prototype.id + '-search-type').getValue();
        var txtIATA = Ext.getCmp(prototype.id + '-txtIATA').getValue();
        var txtFilterDateFrom = Ext.getCmp(prototype.id + '-txtFilterDateFrom').getRawValue();
        var txtFilterDateTo = Ext.getCmp(prototype.id + '-txtFilterDateTo').getRawValue();
        var txtCia = Ext.getCmp(prototype.id + '-txtCia').getValue();
        var txtFrmaSerie = Ext.getCmp(prototype.id + '-txtFrmaSerie').getValue();
        var txtSeq = Ext.getCmp(prototype.id + '-txtSeq').getValue();
        var txtNumber = Ext.getCmp(prototype.id + '-txtNumber').getValue();
        var txtcountry = Ext.getCmp(prototype.id + '-country').getValue();
        var CmbOrigin = Ext.getCmp(prototype.id + '-CmbOrigin').getValue();
        var CmbStatus = Ext.getCmp(prototype.id + '-CmbStatus').getValue();
        var CmbArea = Ext.getCmp(prototype.id + '-CmbArea').getValue();
        var CombSource = Ext.getCmp(prototype.id + '-ComboSource').getValue();
        var CombChannel = Ext.getCmp(prototype.id + '-ComboChannel').getValue();
        var txtcountry2 = Ext.getCmp(prototype.id + '-country2').getValue();

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
                //if (Date.parse(Ext.getCmp(prototype.id + '-txtFilterDateFrom').getValue()) > Date.parse(Ext.getCmp(prototype.id + '-txtFilterDateTo').getValue())) {
                /*if (global.validate_fechaMayorQue(Ext.String.trim(Ext.getCmp(prototype.id + '-txtFilterDateFrom').getRawValue()), Ext.String.trim(Ext.getCmp(prototype.id + '-txtFilterDateTo').getRawValue()))) {
                    Ext.MessageBox.alert('PRAXIS', "the starting date must be less than the end date", function (btn, text) {
                        if (btn === 'ok' || btn === 'cancel')
                            setTimeout("Ext.getCmp(prototype.id + '-txtFilterDateTo').focus();", 100);
                    });
                    return;
                }*/
            }
        }

        if (ComboBy === "2" || ComboBy === "3" || ComboBy === "4") {
            me.bean.OPCIONTYPE = ComboBy;
            if (ComboBy === "2" || ComboBy === "3")
            {
                me.bean.NUMBERADM = txtNumber;
                me.bean.COUNTRY = txtcountry;
            } else {
                me.bean.NUMBERADM = '';
                me.bean.COUNTRY = '';
            }
            if (ComboBy === "4") {
                me.bean.CIA = txtCia;
                me.bean.FORMA = txtFrmaSerie.substring(0, 4);
                me.bean.SERIE = txtFrmaSerie.substring(4, 10);
            } else {
                me.bean.CIA = '';
                me.bean.FORMA = '';
                me.bean.SERIE = '';
            }
            me.bean.DATEFROM = '';
            me.bean.DATETO = '';
            me.bean.CURRENCY = '';
            me.bean.COMBOCHANNEL = '';
            me.bean.CHANNEL = '';
            me.bean.AUTMAN = '';
            me.bean.STATUS = '';
            me.bean.VP_TUORCODE = '';
            me.bean.VP_USER = '';
        }
        if (ComboBy === "1" || ComboBy === "5" || ComboBy === "13" || ComboBy === "14") {
            me.bean.OPCIONTYPE = ComboBy;
            me.bean.DATEFROM = txtFilterDateFrom;
            me.bean.DATETO = txtFilterDateTo;
            me.bean.AUTMAN = CmbOrigin;
            me.bean.STATUS = CmbStatus;
            me.bean.COMBOCHANNEL = CombSource;
            me.bean.CHANNEL = CombChannel;
            me.bean.COUNTRY = txtcountry2;
            me.bean.VP_TUORCODE = "";
            me.bean.VP_USER = "";

            me.bean.CIA = '';
            me.bean.NUMBERADM = '';
            me.bean.FORMA = '';
            me.bean.SERIE = '';
        }
        if (ComboBy === "12") {
            me.bean.OPCIONTYPE = ComboBy;
            me.bean.NUMBERADM = txtIATA;
            me.bean.AUTMAN = CmbOrigin;
            me.bean.STATUS = CmbStatus;
            me.bean.COMBOCHANNEL = CombSource;
            me.bean.CHANNEL = CombChannel;
            me.bean.COUNTRY = txtcountry2;

            me.bean.CIA = '';
            me.bean.FORMA = '';
            me.bean.SERIE = '';
            me.bean.DATEFROM = '';
            me.bean.DATETO = '';
            me.bean.VP_TUORCODE = '';
            me.bean.VP_USER = '';
        }

        me.bean.VP_PREME = '';
        me.bean.VP_CNXPA = '';
        me.bean.VP_TYPE = "";
        me.bean.VP_AREA = CmbArea;

        me.SearchReportADM(me.bean, obj === true ? obj : false);
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
    img_clickHandler_PDF_List: function () {
        var lstNewList = new Array();
        var opflag;
        var items;
        var vlfte = '';
        var grid = Ext.getCmp(prototype.id + '-gridData');

        if (grid.getSelectionModel().hasSelection()) {
            var selection = grid.getSelectionModel().getSelected();
            for (var i = 0; i < selection.length; i++) {
                var row = grid.getSelectionModel().getSelection()[i];
                if (i === 0) {
                    vlfte = Ext.String.trim(row.get('A2548FTE'));
                    lstNewList.push(row.data);
                } else {
                    if (vlfte !== Ext.String.trim(row.get('A2548FTE'))) {
                        Ext.Msg.alert('.: PRAXIS :.', 'You cant not select more than one Source');
                        return;
                    } else {
                        opflag = '';
                        for (var w = 0; w < lstNewList.length; w++) {
                            //items = lstNewList[i];
                            if (lstNewList[w].A2548CNXPA === row.get('A2548CNXPA')) {
                                opflag = '1';
                            }
                        }
                        if (opflag !== '1') {
                            lstNewList.push(row.data);
                        }
                    }
                }

            }
            ///
            if (lstNewList.length > 0) {
                var me = this;
                if (vlfte === 'ASR') {
                    me.exportExcel(prototype.url + '/downloadFilesASR?BeanPDFList=' + encodeURI(JSON.stringify(lstNewList)));
                } else if (vlfte === 'ARC') {
                    me.exportExcel(prototype.url + '/downloadFilesARC?BeanPDFList=' + encodeURI(JSON.stringify(lstNewList)));
                } else {
                    alert('por definir formato');
                }

            } else {
                Ext.Msg.alert('.: PRAXIS :.', 'You must select at least one record');
                return;
            }
        } else {
            global.Msg({msg: 'You must select at least one record'});
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
        var me = this;
        if (bExcel) {
            me.exportExcel(prototype.url + '/getXLSX?beanString=' + encodeURI(JSON.stringify(bean)));
        } else {
            Ext.getCmp(prototype.id + '-gridData').getStore().removeAll();
            Ext.getCmp(prototype.id + '-gridData').getStore().loadPage(1, {
                params: {beanString: JSON.stringify(bean)},
                callback: function (records, operation, success) {
                    if (records.length !== 0) {

                        var Objtemp = records[0].data;
                    } else {
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
            msg: 'Download PDF ?',
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
    }

});
