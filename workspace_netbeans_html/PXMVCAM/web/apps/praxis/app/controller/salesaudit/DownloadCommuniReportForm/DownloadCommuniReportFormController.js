
Ext.define('Ext.Praxis.controller.salesaudit.DownloadCommuniReportForm.DownloadCommuniReportFormController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.DownloadCommuniReportFormController',

    bean: {},
    bean2: {},
    beanDownload: {},
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
        prototype.id = 'DownloadCommuniReportForm';
        prototype.url = CONTEXTPATH + '/DownloadCommuniReportForm';
        prototype.widthWindow = 750;
        prototype.heightWindow = 768;
    },
    setStoresGrids: function () {
        var grid01 = Ext.getCmp(prototype.id + '-gridData');
        var grid02 = Ext.getCmp(prototype.id + '-gridDetalle');

        var store01 = Ext.create('Ext.data.Store', {
            proxy: {
                type: 'ajax',
                url: prototype.url + '/DownloadCommuniFiles/',
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
    },
    onRendererColumnOnTime: function (value, metaData, record, rowIndex, colIndex, store, view) {
        switch (String(record.get('A3455FLAG'))) {
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
    setStoresFilters: function () {
        var cmbSearch = Ext.getCmp(prototype.id + '-search-type');
        var CmbStatus = Ext.getCmp(prototype.id + '-CmbStatus');



        cmbSearch.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "", "name": "SELECTED"},
                {"code": "6", "name": "COUNTRY"},
                {"code": "5", "name": "EXECUTION DATE"},
                {"code": "1", "name": "SYSTEM DATE"}
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

    },
    onCmbSearchChange: function (obj, records, eOpts) {
        var txtSearch = Ext.getCmp(prototype.id + '-search-type');
        var txtFilterDateFrom = Ext.getCmp(prototype.id + '-txtFilterDateFrom');
        var txtFilterDateTo = Ext.getCmp(prototype.id + '-txtFilterDateTo');
        var txtCountry = Ext.getCmp(prototype.id + '-country');
        var CmbStatus = Ext.getCmp(prototype.id + '-CmbStatus');
        var TxtFileName = Ext.getCmp(prototype.id + '-txtFile');
        if (obj.getValue() !== "") {

            txtFilterDateFrom.show();
            txtFilterDateTo.show();
            txtSearch.show();
            CmbStatus.show();
            txtCountry.show();
            TxtFileName.show();

            Ext.getCmp(prototype.id + '-TxtFileName').setValue('');
        } else {
            txtFilterDateFrom.hide();
            txtFilterDateTo.hide();
            txtSearch.hide();
            CmbStatus.hide();
            txtCountry.hide();
            TxtFileName.hide();

            Ext.getCmp(prototype.id + '-TxtFileName').setValue('');

        }
    },
    onRendererColumnOnPais: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = "font-weight:bold !important; color:blue !important; cursor: pointer !important; text-decoration: underline;";
        return '<span onclick="Ext.getCmp(prototype.id + \'-Contenedor\').getController().OnDetail01(' + rowIndex + ');">' + value + '</span>'
    },
    OnDetail01: function (rowIndex) {
        var gridData = Ext.getCmp(prototype.id + '-gridData');
        var total = Ext.getCmp(prototype.id + '-lbl-total');

        var gridDetalle = Ext.getCmp(prototype.id + '-gridDetalle');
        var totalDeta = Ext.getCmp(prototype.id + '-lbl-totalDeta');
        var back = Ext.getCmp(prototype.id + '-btn-back');
        Ext.getCmp(prototype.id + '-btn-File').setVisible(true);
        Ext.getCmp(prototype.id + '-btn-ListFiles').setVisible(false);
        Ext.getCmp(prototype.id + '-contenedor-filters').setVisible(false);
        Ext.getCmp(prototype.id + '-btn-search').setVisible(false);
        Ext.getCmp(prototype.id + '-btn-filter').setVisible(false);
        Ext.getCmp(prototype.id + '-btn-excel').setVisible(false);
        //Ext.getCmp(prototype.id + '-contenedor-options').setVisible(false); 

        gridData.hide();
        total.hide();

        gridDetalle.show();
        totalDeta.show();
        back.show();

        ///CARGANDO EL DETALLE DE LA GRTILLA 
        var grid = Ext.getCmp(prototype.id + '-gridData');
        var store = grid.getStore();
        var rec = store.getAt(rowIndex);

        this.bean2.IN_OPTION = '2';
        this.bean2.IN_FDATE = rec.data.A3455FDATE;
        this.bean2.IN_COUNTRY = rec.data.A3455PAIS;
        this.bean2.IN_SEQ = rec.data.A3455SEQ;
        Ext.getCmp(prototype.id + '-gridDetalle').getStore().removeAll();
        Ext.getCmp(prototype.id + '-gridDetalle').getStore().loadPage(1, {
            params: {
                beanString: JSON.stringify(this.bean2)

            }, callback: function (records, operation, success) {
                if (records.length !== 0) {
                    Ext.getCmp(prototype.id + '-lbl-totalDeta').setText(records[0].data.A3455TOTALPAGI);
                } else {
                    Ext.getCmp(prototype.id + '-lbl-totalDeta').setText('0');
                    global.Msg({msg: "Data not found.", icon: 2, fn: function () {
                        }});

                }

            }
        });


    },
    onBackClick: function (obj, e) {
        Ext.getCmp(prototype.id + '-gridData').setVisible(true);
        Ext.getCmp(prototype.id + '-lbl-total').setVisible(true);
        Ext.getCmp(prototype.id + '-btn-ListFiles').setVisible(true);
        Ext.getCmp(prototype.id + '-contenedor-filters').setVisible(true);
        Ext.getCmp(prototype.id + '-btn-search').setVisible(true);
        Ext.getCmp(prototype.id + '-btn-filter').setVisible(true);
        Ext.getCmp(prototype.id + '-btn-excel').setVisible(true);
        // Ext.getCmp(prototype.id + '-contenedor-options').setVisible(true); 

        Ext.getCmp(prototype.id + '-lbl-total').setText('0');
        Ext.getCmp(prototype.id + '-gridDetalle').setVisible(false);
        Ext.getCmp(prototype.id + '-lbl-totalDeta').setVisible(false);
        Ext.getCmp(prototype.id + '-btn-back').setVisible(false);
        Ext.getCmp(prototype.id + '-btn-File').setVisible(false);
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
        var txtFilterDateFrom = Ext.getCmp(prototype.id + '-txtFilterDateFrom').getRawValue();
        var txtFilterDateTo = Ext.getCmp(prototype.id + '-txtFilterDateTo').getRawValue();
        var txtcountry = Ext.getCmp(prototype.id + '-country').getValue();
        var CmbStatus = Ext.getCmp(prototype.id + '-CmbStatus').getValue();
        var TxtFileName = Ext.getCmp(prototype.id + '-txtFile').getValue();

        if (ComboBy === '') {
            global.Msg({msg: 'Select Of By'});
            return;
        }

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
            /*if (global.validate_fechaMayorQue(Ext.String.trim(Ext.getCmp(prototype.id + '-txtFilterDateFrom').getRawValue()), Ext.String.trim(Ext.getCmp(prototype.id + '-txtFilterDateTo').getRawValue()))) {
                Ext.MessageBox.alert('PRAXIS', "the starting date must be less than the end date", function (btn, text) {
                    if (btn === 'ok' || btn === 'cancel')
                        setTimeout("Ext.getCmp(prototype.id + '-txtFilterDateTo').focus();", 100);
                });
                return;
            }*/
        }
        me.bean.IN_OPTION = ComboBy;
        me.bean.IN_DATEFROM = txtFilterDateFrom;
        me.bean.IN_DATETO = txtFilterDateTo;
        me.bean.IN_COUNTRY = txtcountry;
        me.bean.IN_STATUS = CmbStatus;
        me.bean.IN_NAME = TxtFileName;

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
    imgClear_clickHandler: function (obj, e) {

        Ext.getCmp(prototype.id + '-txtFile').setValue('');
        Ext.getCmp(prototype.id + '-txtFilterDateFrom').setValue('');
        Ext.getCmp(prototype.id + '-txtFilterDateTo').setValue('');
        Ext.getCmp(prototype.id + '-country').setValue('');
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
                params: {
                    beanString: JSON.stringify(bean)

                }, callback: function (records, operation, success) {
                    if (records.length !== 0) {
                        Ext.getCmp(prototype.id + '-lbl-total').setText(records[0].data.A3455TOTALPAGI);
                    } else {
                        Ext.getCmp(prototype.id + '-lbl-total').setText('0');
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
    onFileClick: function () {
        var me = this;
        var VL_A3280DESDE = '';
        var VL_A3280COUNTRY = '';
        var grid = Ext.getCmp(prototype.id + '-gridDetalle');
        for (var w = 0; w < grid.getStore().data.length; w++) {
            var record = grid.getStore().getAt(w);
            if (w === 0) {
                VL_A3280DESDE = record.data.A3455FDATE;
                VL_A3280COUNTRY = record.data.A3455PAIS;
            }
        }
        me.beanDownload.IN_DATEFROM = VL_A3280DESDE;
        me.beanDownload.IN_COUNTRY = VL_A3280COUNTRY;
        me.exportFiles(prototype.url + '/downloadFile?beanString=' + encodeURI(JSON.stringify(me.beanDownload)));
    },
    onListFilesClick: function () {
        var me = this;
        var lstNewList = new Array();
        var VL_A3280FDATE = '';
        var VL_A3280DESDE = '';
        var VL_A3280HASTA = '';
        var vl_total_reg = 0;
        var vl_total_regsta = 0;
        var opflag;
        var items;
        var vlfte = '';
        var grid = Ext.getCmp(prototype.id + '-gridData');
        if (grid.getSelectionModel().hasSelection()) {
            var selection = grid.getSelectionModel().getSelected();
            for (var i = 0; i < selection.length; i++) {
                var row = grid.getSelectionModel().getSelection()[i];
                if (i === 0) {
                    VL_A3280FDATE = Ext.String.trim(row.get('A3455FDATE'));
                    lstNewList.push(row.data);
                } else {
                    if (VL_A3280FDATE !== row.get('A3455FDATE')) {
                        lstNewList.push(row.data);
                    }
                }
            }
            lstNewList.sort;
            if (lstNewList.length > 0) {
                vl_total_reg = lstNewList.length;
                vl_total_regsta = 0;
                for (var z = 0; z < lstNewList.length; z++) {
                    if (z === 0) {
                        VL_A3280DESDE = lstNewList[z].A3455FDATE;
                    }
                    vl_total_regsta = vl_total_reg - 1;
                    if (vl_total_regsta === 0) {
                        VL_A3280HASTA = lstNewList[z].A3455FDATE;
                    }
                }

                me.beanDownload.IN_DATEFROM = VL_A3280DESDE;
                me.beanDownload.IN_DATETO = VL_A3280HASTA;
                me.exportFiles(prototype.url + '/DownloadFiles_python?beanString=' + encodeURI(JSON.stringify(me.beanDownload)));

            } else {
                lstNewList.removeAll();
                global.Msg({msg: 'You must select at least one record'});
                return;
            }

        } else {
            global.Msg({msg: 'You must select at least one record'});
            return;
        }
    },
    exportFiles: function (_path) {
        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: 'Download Files zip ?',
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

});

