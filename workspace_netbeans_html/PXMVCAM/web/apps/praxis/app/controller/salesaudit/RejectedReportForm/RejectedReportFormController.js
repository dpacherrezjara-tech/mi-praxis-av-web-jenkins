
Ext.define('Ext.Praxis.controller.salesaudit.RejectedReportForm.RejectedReportFormController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.RejectedReportFormController',

    /**
     * Constructor
     */

    bean: {},
    bean2: {},
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
        prototype.idRejecte = 'RejectedReportForm';
        prototype.url = CONTEXTPATH + '/RejectedReportForm';
        prototype.widthWindow = 1366;
        prototype.heightWindow = 768;
    },
    setStoresGrids: function () {
        var grid01 = Ext.getCmp(prototype.idRejecte + '-gridData');
        var grid02 = Ext.getCmp(prototype.idRejecte + '-gridDetalle');

        var store01 = Ext.create('Ext.data.Store', {
            proxy: {
                type: 'ajax',
                url: prototype.url + '/searchDowloadFiles/',
                timeout: '300000',
                reader: {
                    type: 'json',
                    rootProperty: 'data',
                    totalProperty: 'total'
                }
            },
            pageSize: 25
        });
        var store02 = Ext.create('Ext.data.Store', {
            storeId: prototype.idRejecte + '-store-gridDetalle'
        });

        grid01.setStore(store01);
        grid02.setStore(store02);
    },
    onRendererColumnOnTime: function (value, metaData, record, rowIndex, colIndex, store, view) {
        switch (String(record.get('A3456FLAG'))) {
            case 'D':
                value = 'silver';
                break;
            case 'A':
            case 'Y':
                value = 'green';
                break;
            default:
                value = 'red';
        }
        return '<i class="fas fa-circle" style="font-size: 16px; color:' + value + ';"></i>';
    },
    onRendererColumnOnTime2: function (value, metaData, record, rowIndex, colIndex, store, view) {
        switch (String(record.get('A3456ESTAT'))) {
            case 'D':
                value = 'silver';
                break;
            case 'A':
            case 'Y':
                value = 'green';
                break;
            default:
                value = 'red';
        }
        return '<i class="fas fa-circle" style="font-size: 16px; color:' + value + ';"></i>';
    },
    onCmbSearchAfterRender: function (obj) {
        obj.setValue('');
    },
    onCmbPeriAfterRender: function (obj) {
        obj.setValue('1');
    },
    setStoresFilters: function () {
        var cmbSearch = Ext.getCmp(prototype.idRejecte + '-search');
        var cmbtype = Ext.getCmp(prototype.idRejecte + '-type');
        var cmbPer1 = Ext.getCmp(prototype.idRejecte + '-Per1');
        var cmbPer2 = Ext.getCmp(prototype.idRejecte + '-Per2');
        var CmbStatus = Ext.getCmp(prototype.idRejecte + '-CmbStatus');
        var CmbError = Ext.getCmp(prototype.idRejecte + '-CmbError');


        cmbSearch.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "", "name": "SELECTED"},
                {"code": "1", "name": "ROBOT CONTROL"},
                {"code": "2", "name": "DETAILED"}
            ]
        }));
        cmbtype.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "", "name": "SELECTED"},
                {"code": "1", "name": "SYSTEM DATE"},
                {"code": "7", "name": "PERIOD"}
            ]
        }));
        cmbPer1.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "1", "name": "1"},
                {"code": "2", "name": "2"},
                {"code": "3", "name": "3"},
                {"code": "4", "name": "4"},
                {"code": "5", "name": "5"},
                {"code": "6", "name": "6"},
                {"code": "7", "name": "7"},
                {"code": "8", "name": "8"}
            ]
        }));
        cmbPer2.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "1", "name": "1"},
                {"code": "2", "name": "2"},
                {"code": "3", "name": "3"},
                {"code": "4", "name": "4"},
                {"code": "5", "name": "5"},
                {"code": "6", "name": "6"},
                {"code": "7", "name": "7"},
                {"code": "8", "name": "8"}
            ]
        }));
        CmbStatus.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "", "name": "ALL"},
                {"code": "A", "name": "PROCESSED CORRECTLY"},
                {"code": "C", "name": "PASSWORD EXPIRATION"},
                {"code": "D", "name": "NO DATA FOUND"},
                {"code": "E", "name": "ERROR IN THE PROCESS"},
                {"code": "H", "name": "MAIL NOT CONFIRMED"},
                {"code": "M", "name": "MANY PEOPLE CONNECTED"},
                {"code": "N", "name": "USER NOT VALID"},
                {"code": "R", "name": "RECOVERY OF ELIMINATED"}
            ]
        }));

        CmbError.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "", "name": "ALL"},
                {"code": "M", "name": "Modify"},
                {"code": "R", "name": "Rejected"},
                {"code": "W", "name": "Warning"},
            ]
        }));

    },
    onCmbSearchChange: function (obj, records, eOpts) {
        var gridData = Ext.getCmp(prototype.idRejecte + '-gridData');
        var gridDetalle = Ext.getCmp(prototype.idRejecte + '-gridDetalle');
        if (obj.getValue() === "1") {
            gridData.show();
            gridDetalle.hide();
            Ext.getCmp(prototype.idRejecte + '-gridDetalle').getStore().removeAll();
        } else if (obj.getValue() === "2") {
            gridDetalle.show();
            gridData.hide();
            Ext.getCmp(prototype.idRejecte + '-gridData').getStore().removeAll();
        } else {

        }
    },
    onCmbTypeChange: function (obj, records, eOpts) {
        var cmbDateFromYear = Ext.getCmp(prototype.idRejecte + '-cmbDateFromYear');
        var cmbDateFromMonth = Ext.getCmp(prototype.idRejecte + '-cmbDateFromMonth');
        var cmbPer1 = Ext.getCmp(prototype.idRejecte + '-Per1');
        var cmbDateToYear = Ext.getCmp(prototype.idRejecte + '-cmbDateToYear');
        var cmbDateToMonth = Ext.getCmp(prototype.idRejecte + '-cmbDateToMonth');
        var cmbPer2 = Ext.getCmp(prototype.idRejecte + '-Per2');
        var txtFilterDateFrom = Ext.getCmp(prototype.idRejecte + '-txtFilterDateFrom');
        var txtFilterDateTo = Ext.getCmp(prototype.idRejecte + '-txtFilterDateTo');
        var txtCountry = Ext.getCmp(prototype.idRejecte + '-txtCountry');
        var CmbStatus = Ext.getCmp(prototype.idRejecte + '-CmbStatus');
        var CmbError = Ext.getCmp(prototype.idRejecte + '-CmbError');
        var txtTiccket = Ext.getCmp(prototype.idRejecte + '-txtTiccket');

        if (obj.getValue() === "1") {

            txtFilterDateFrom.show();
            txtFilterDateTo.show();
            txtCountry.show();
            txtTiccket.show();
            CmbStatus.show();

            cmbDateFromYear.hide();
            cmbDateFromMonth.hide();
            cmbPer1.hide();
            cmbDateToYear.hide();
            cmbDateToMonth.hide();
            cmbPer2.hide();
            CmbError.hide();


        } else if (obj.getValue() === "7") {

            cmbDateFromYear.show();
            cmbDateFromMonth.show();
            cmbPer1.show();
            cmbDateToYear.show();
            cmbDateToMonth.show();
            cmbPer2.show();
            CmbError.show();
            txtCountry.show();
            txtTiccket.show();

            txtFilterDateFrom.hide();
            txtFilterDateTo.hide();
            CmbStatus.hide();



        } else {
            cmbDateFromYear.hide();
            cmbDateFromMonth.hide();
            cmbPer1.hide();
            cmbDateToYear.hide();
            cmbDateToMonth.hide();
            cmbPer2.hide();
            CmbError.hide();
            txtCountry.hide();
            txtTiccket.hide();

            txtFilterDateFrom.hide();
            txtFilterDateTo.hide();
            CmbStatus.hide();

        }
    },
    onRendererColumnOnPais: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = "font-weight:bold !important; color:blue !important; cursor: pointer !important; text-decoration: underline;";
        return '<span onclick="Ext.getCmp(prototype.idRejecte + \'-Contenedor\').getController().OnDetail01(' + rowIndex + ');">' + value + '</span>'
    },
    OnDetail01: function (rowIndex) {
        var VL_FDATE1 = '';
        var VL_FDATE2 = '';
        var gridData = Ext.getCmp(prototype.idRejecte + '-gridData');
        var total = Ext.getCmp(prototype.idRejecte + '-lbl-total');

        var gridDetalle = Ext.getCmp(prototype.idRejecte + '-gridDetalle');
        var totalDeta = Ext.getCmp(prototype.idRejecte + '-lbl-totalDeta');
        var back = Ext.getCmp(prototype.idRejecte + '-btn-back');
        Ext.getCmp(prototype.idRejecte + '-btn-File').setVisible(true);
        //Ext.getCmp(prototype.idRejecte + '-btn-ListFiles').setVisible(false);
        Ext.getCmp(prototype.idRejecte + '-contenedor-filters').setVisible(false);
        Ext.getCmp(prototype.idRejecte + '-btn-search').setVisible(false);
        Ext.getCmp(prototype.idRejecte + '-btn-filter').setVisible(false);
        Ext.getCmp(prototype.idRejecte + '-btn-excel').setVisible(false);
        //Ext.getCmp(prototype.idRejecte + '-contenedor-options').setVisible(false);         
        var cmbDateFromYear = Ext.getCmp(prototype.idRejecte + '-cmbDateFromYear').getValue();
        var cmbDateFromMonth = Ext.getCmp(prototype.idRejecte + '-cmbDateFromMonth').getValue();
        var cmbPer1 = Ext.getCmp(prototype.idRejecte + '-Per1').getValue();
        var cmbDateToYear = Ext.getCmp(prototype.idRejecte + '-cmbDateToYear').getValue();
        var cmbDateToMonth = Ext.getCmp(prototype.idRejecte + '-cmbDateToMonth').getValue();
        var cmbPer2 = Ext.getCmp(prototype.idRejecte + '-Per2').getValue();

        gridData.hide();
        total.hide();

        gridDetalle.show();
        totalDeta.show();
        back.show();

        ///CARGANDO EL DETALLE DE LA GRTILLA 
        var grid = Ext.getCmp(prototype.idRejecte + '-gridData');
        var store = grid.getStore();
        var rec = store.getAt(rowIndex);

        this.bean2.IN_FLAG = '';
        this.bean2.IN_OPTION = '2';
        var ComboType = Ext.getCmp(prototype.idRejecte + '-type').getValue();
        if (ComboType === '1') {
            this.bean2.IN_DATEFROM = rec.data.A3456FDATE;
            this.bean2.IN_DATETO = rec.data.A3456FDATE;
        } else {
            // win.getMonthAbbreviation(cmbDateFromMonth)
            this.bean2.IN_DATEFROM = cmbDateFromYear + "" + win.getMonthAbbreviation(cmbDateFromMonth)+ "" + cmbPer1;
            this.bean2.IN_DATETO = cmbDateToYear + "" + win.getMonthAbbreviation(cmbDateToMonth) + "" + cmbPer2;
            this.bean2.IN_OPTION = '8';
        }
        this.bean2.IN_COUNTRY = rec.data.A3456PAIS;
        this.bean2.IN_SEQ = rec.data.A3456SEQ;
        this.bean2.IN_STATUS ='';
        this.bean2.IN_NAME ='';
        Ext.getCmp(prototype.idRejecte + '-gridDetalle').getStore().removeAll();
        Ext.getCmp(prototype.idRejecte + '-Contenedor').mask('Please Wait....');
        Ext.Ajax.request({
            url: prototype.url + '/SearchRejectedDocDetail/',
            method: 'POST',
            timeout: '300000',
            params: {
                beanString: JSON.stringify(this.bean2)
            },
            success: function (response, options) {
                Ext.getCmp(prototype.idRejecte + '-Contenedor').unmask();
                var res = Ext.JSON.decode(response.responseText);
                console.log(res);
                if (res.length !== 0) {
                    Ext.getCmp(prototype.idRejecte + '-gridDetalle').getStore().removeAll();
                    Ext.getCmp(prototype.idRejecte + '-gridDetalle').getStore().loadData(res.data);
                    Ext.getCmp(prototype.idRejecte + '-lbl-totalDeta').setText(res.data[0].A3456TOTALPAGI);
                     //Ext.getCmp(prototype.idRejecte + '-lbl-totalDeta').setText(res[0].data.A3455TOTALPAGI);

                } else {
                     Ext.getCmp(prototype.idRejecte + '-lbl-totalDeta').setText('0');
                    global.Msg({msg: "Data not found.", icon: 2, fn: function () {
                        }})
                }
            }
        });
        /* Ext.getCmp(prototype.idRejecte + '-gridDetalle').getStore().loadPage(1, {
         params: {
         beanString: JSON.stringify(this.bean2)
         
         }, callback: function (records, operation, success) {
         if (records.length !== 0) {
         Ext.getCmp(prototype.idRejecte + '-lbl-totalDeta').setText(records[0].data.A3455TOTALPAGI);
         } else {
         Ext.getCmp(prototype.idRejecte + '-lbl-totalDeta').setText('0');
         global.Msg({msg: "Data not found.", icon: 2, fn: function () {
         }});
         
         }
         
         }
         });*/


    },
    onFileClick: function (obj, e) {
        var me = this;
        if (me.IN_COUNTRY === '') {
            global.Msg({msg: 'Select Of Data'});
            return;
        } else {
            me.exportExcel(prototype.url + '/getXLSXDetaill?beanString=' + encodeURI(JSON.stringify(me.bean2)));
        }
    },
    onBackClick: function (obj, e) {
        Ext.getCmp(prototype.idRejecte + '-gridData').setVisible(true);
        Ext.getCmp(prototype.idRejecte + '-lbl-total').setVisible(true);
        //Ext.getCmp(prototype.idRejecte + '-btn-ListFiles').setVisible(true);
        Ext.getCmp(prototype.idRejecte + '-contenedor-filters').setVisible(true);
        Ext.getCmp(prototype.idRejecte + '-btn-search').setVisible(true);
        Ext.getCmp(prototype.idRejecte + '-btn-filter').setVisible(true);
        Ext.getCmp(prototype.idRejecte + '-btn-excel').setVisible(true);
        // Ext.getCmp(prototype.idRejecte + '-contenedor-options').setVisible(true); 

        //Ext.getCmp(prototype.idRejecte + '-lbl-total').setText('0');
        Ext.getCmp(prototype.idRejecte + '-gridDetalle').setVisible(false);
        Ext.getCmp(prototype.idRejecte + '-lbl-totalDeta').setVisible(false);
        Ext.getCmp(prototype.idRejecte + '-btn-back').setVisible(false);
        Ext.getCmp(prototype.idRejecte + '-btn-File').setVisible(false);
    },
    onRendererColumnAttr: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.tdAttr = 'data-qtip="' + value + '"';
        return value;
    },
    onColumnAmountRenderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = "background:#D5F4D5 !important";
        return Ext.util.Format.number(value, '0,000.00');
    },
    onCmbDateAfterRender: function (obj) {
        var fecha = new Date();
        obj.setValue(fecha.getFullYear());
    },
    onCmbMonthAfterRender: function (obj) {
        var fecha = new Date();
        fecha = fecha.getMonth() + 1;
        if (fecha <= 9) {
            fecha = 0 + '' + fecha.toString();
        } else {
            fecha = fecha.toString();
        }
        ;
        obj.setValue(win.getAbreviaturaMes(fecha));
    },
    imgSearch_clickHandler: function (obj, e) {
        var me = this;
        var fecha = new Date().getFullYear();
        var ComboSearch = Ext.getCmp(prototype.idRejecte + '-search').getValue();
        var ComboType = Ext.getCmp(prototype.idRejecte + '-type').getValue();
        var cmbDateFromYear = Ext.getCmp(prototype.idRejecte + '-cmbDateFromYear').getValue();
        var cmbDateFromMonth = Ext.getCmp(prototype.idRejecte + '-cmbDateFromMonth').getValue();
        var cmbPer1 = Ext.getCmp(prototype.idRejecte + '-Per1').getValue();
        var cmbDateToYear = Ext.getCmp(prototype.idRejecte + '-cmbDateToYear').getValue();
        var cmbDateToMonth = Ext.getCmp(prototype.idRejecte + '-cmbDateToMonth').getValue();
        var cmbPer2 = Ext.getCmp(prototype.idRejecte + '-Per2').getValue();

        var txtFilterDateFrom = Ext.getCmp(prototype.idRejecte + '-txtFilterDateFrom').getRawValue();
        var txtFilterDateTo = Ext.getCmp(prototype.idRejecte + '-txtFilterDateTo').getRawValue();
        var txtCountry = Ext.getCmp(prototype.idRejecte + '-txtCountry').getValue();
        var CmbStatus = Ext.getCmp(prototype.idRejecte + '-CmbStatus').getValue();
        var CmbError = Ext.getCmp(prototype.idRejecte + '-CmbError').getValue();
        var txtTicket = Ext.getCmp(prototype.idRejecte + '-txtTiccket').getValue();

        if (ComboType === '') {
            global.Msg({msg: 'Select Of By'});
            return;
        }
        if (ComboType === '1') {
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
                            setTimeout("Ext.getCmp(prototype.idRejecte + '-txtFilterDateFrom').focus();", 100);
                    });
                    return;
                }

                if (global.existeFecha(txtFilterDateTo) !== '') {
                    Ext.MessageBox.alert('PRAXIS', global.existeFecha(txtFilterDateTo), function (btn, text) {
                        if (btn === 'ok' || btn === 'cancel')
                            setTimeout("Ext.getCmp(prototype.idRejecte + '-txtFilterDateTo').focus();", 100);
                    });
                    return;
                }
                /*if (global.validate_fechaMayorQue(Ext.String.trim(Ext.getCmp(prototype.idRejecte + '-txtFilterDateFrom').getRawValue()), Ext.String.trim(Ext.getCmp(prototype.idRejecte + '-txtFilterDateTo').getRawValue()))) {
                    Ext.MessageBox.alert('PRAXIS', "the starting date must be less than the end date", function (btn, text) {
                        if (btn === 'ok' || btn === 'cancel')
                            setTimeout("Ext.getCmp(prototype.idRejecte + '-txtFilterDateTo').focus();", 100);
                    });
                    return;
                }*/
            }
            me.bean.IN_DATEFROM = txtFilterDateFrom;
            me.bean.IN_DATETO = txtFilterDateTo;
            me.bean.IN_STATUS = CmbStatus;
            me.bean.IN_FLAG = '';
        } else if (ComboType === '7') {
            me.bean.IN_DATEFROM = cmbDateFromYear + "" + win.getMonthAbbreviation(cmbDateFromMonth) + "" + cmbPer1;
            me.bean.IN_DATETO = cmbDateToYear + "" + win.getMonthAbbreviation(cmbDateToMonth) + "" + cmbPer2;
            me.bean.IN_Error = CmbError;
            me.bean.IN_STATUS = "";
            me.bean.IN_FLAG = CmbError;
        }

        if (ComboSearch === '1') {
            me.bean.IN_OPTION = ComboType;
        } else {
            if (ComboType === '1') {
                me.bean.IN_OPTION = '9';
            } else {
                me.bean.IN_OPTION = '10';
            }
        }


        me.bean.IN_COUNTRY = txtCountry;
        me.bean.IN_Ticcket = txtTicket;
        me.bean.ComboSearch = ComboSearch;

        me.SearchReport(me.bean, obj === true ? obj : false);
    },
    imgFilter_clickHandler: function () {
        var option = Ext.getCmp(prototype.idRejecte + '-contentFilter');
        if (option.isVisible())
            option.hide();
        else
            option.show();
    },
    imgExcel_clickHandler: function (obj, e) {
        this.imgSearch_clickHandler(true);
    },
    imgClear_clickHandler: function (obj, e) {

        Ext.getCmp(prototype.idRejecte + '-txtFile').setValue('');
        Ext.getCmp(prototype.idRejecte + '-txtFilterDateFrom').setValue('');
        Ext.getCmp(prototype.idRejecte + '-txtFilterDateTo').setValue('');
        Ext.getCmp(prototype.idRejecte + '-country').setValue('');
        var campo_cantidad = Ext.getCmp(prototype.idRejecte + '-campo_cantidad');
        var box_filter_02 = Ext.getCmp(prototype.idRejecte + '-box-filter-02');
        var country = Ext.getCmp(prototype.idRejecte + '-country');
        campo_cantidad.hide();
        box_filter_02.hide();
        country.hide();
    },
    onSearchkey: function (f, e) {
        if (e.getKey() === e.ENTER) {
            this.imgSearch_clickHandler();
        }

    },
    SearchReport: function (bean, bExcel) {
        var me = this;
        if (bExcel) {
            if (bean.ComboSearch === '1') {
                me.exportExcel(prototype.url + '/getXLSX?beanString=' + encodeURI(JSON.stringify(bean)));
            } else {
                me.exportExcel(prototype.url + '/getXLSXDetaill?beanString=' + encodeURI(JSON.stringify(me.bean)));
            }
        } else {
            Ext.getCmp(prototype.idRejecte + '-gridData').getStore().removeAll();
            Ext.getCmp(prototype.idRejecte + '-gridDetalle').getStore().removeAll();
            if (bean.ComboSearch === '1') {
                Ext.getCmp(prototype.idRejecte + '-gridData').getStore().loadPage(1, {
                    params: {
                        beanString: JSON.stringify(bean)

                    }, callback: function (records, operation, success) {
                        if (records.length !== 0) {
                            Ext.getCmp(prototype.idRejecte + '-lbl-total').setText(records[0].data.A3456TOTALPAGI);
                        } else {
                            Ext.getCmp(prototype.idRejecte + '-lbl-total').setText('0');
                            global.Msg({msg: "Data not found.", icon: 2, fn: function () {
                                }});

                        }

                    }
                });
            } else {
                Ext.getCmp(prototype.idRejecte + '-Contenedor').mask('Please Wait....');
                Ext.Ajax.request({
                    url: prototype.url + '/searchDowloadFiles/',
                    method: 'POST',
                    timeout: '300000',
                    params: {
                        beanString: JSON.stringify(bean)
                    },
                    success: function (response, options) {
                        Ext.getCmp(prototype.idRejecte + '-Contenedor').unmask();
                        var res = Ext.JSON.decode(response.responseText);
                        if (res.data.length !== 0) {
                            Ext.getCmp(prototype.idRejecte + '-gridDetalle').getStore().removeAll();
                            Ext.getCmp(prototype.idRejecte + '-gridDetalle').getStore().loadData(res.data);
                            Ext.getCmp(prototype.idRejecte + '-lbl-total').setText(res.data[0].A3456TOTALPAGI);

                        } else {
                             Ext.getCmp(prototype.idRejecte + '-lbl-total').setText('0');
                            global.Msg({msg: "Data not found.", icon: 2, fn: function () {
                                }})
                        }
                    }
                });
            }

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
    onClearClick: function (obj, e) {
        Ext.getCmp(prototype.idRejecte + '-gridData').getStore().removeAll();
        Ext.getCmp(prototype.idRejecte + '-gridDetalle').getStore().removeAll();
    }

});

