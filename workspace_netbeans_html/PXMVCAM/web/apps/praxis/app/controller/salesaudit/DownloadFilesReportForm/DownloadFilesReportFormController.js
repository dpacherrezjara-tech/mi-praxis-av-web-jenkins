
Ext.define('Ext.Praxis.controller.salesaudit.DownloadFilesReportForm.DownloadFilesReportFormController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.DownloadFilesReportFormController',

    bean: {},
    beanDownload: {},
    bean2: {},
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
        switch (String(record.get('A3280FLAG'))) {
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
        prototype.id = 'DownloadFilesReportForm';
        prototype.url = CONTEXTPATH + '/DownloadFilesReportForm';
        prototype.widthWindow = 1366;
        prototype.heightWindow = 768;
    },
    setStores: function () {
        var grid01 = Ext.getCmp(prototype.id + '-gridData');
        var grid02 = Ext.getCmp(prototype.id + '-gridDetalle');

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
    setStoresFilters: function () {
        var cmbSearch = Ext.getCmp(prototype.id + '-search-type');
        var cmbStatus = Ext.getCmp(prototype.id + '-CmbStatus');

        cmbSearch.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "", "name": "SELECTED"},
                {"code": "6", "name": "COUNTRY"},
                {"code": "1", "name": "SYSTEM DATE"},
                {"code": "5", "name": "EXECUTION DATE"}
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
    },
    onchange: function (field, newValue, oldValue) {
        field.setValue(newValue.toUpperCase());
    },
    onCmbSearchAfterRender: function (obj) {
        obj.setValue('');
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
        Ext.getCmp(prototype.id + '-gridData').setVisible(true);
        Ext.getCmp(prototype.id + '-lbl-total').setVisible(true);
        Ext.getCmp(prototype.id + '-btn-ListFiles').setVisible(true);
        Ext.getCmp(prototype.id + '-contenedor-filters').setVisible(true); 
        Ext.getCmp(prototype.id + '-btn-search').setVisible(true);
        Ext.getCmp(prototype.id + '-btn-filter').setVisible(true);
        Ext.getCmp(prototype.id + '-btn-excel').setVisible(true);
       // Ext.getCmp(prototype.id + '-contenedor-options').setVisible(true); 

        //Ext.getCmp(prototype.id + '-lbl-total').setText('0');
        Ext.getCmp(prototype.id + '-gridDetalle').setVisible(false);
        Ext.getCmp(prototype.id + '-lbl-totalDeta').setVisible(false);
        Ext.getCmp(prototype.id + '-btn-back').setVisible(false);
        Ext.getCmp(prototype.id + '-btn-File').setVisible(false);
    },
    imgSearch_clickHandler: function (obj, records, eOpts) {
        var me = this;
        var cmbsearch = Ext.getCmp(prototype.id + '-search-type').getValue();
        var txtDateFrom = Ext.getCmp(prototype.id + '-txtFilterDateFrom').getRawValue();
        var txtDateTo = Ext.getCmp(prototype.id + '-txtFilterDateTo').getRawValue();
        var txtcountry = Ext.getCmp(prototype.id + '-country').getValue();
        var txtFile = Ext.getCmp(prototype.id + '-txtFile').getValue();
        var CmbStatus = Ext.getCmp(prototype.id + '-CmbStatus').getValue();
        if (cmbsearch === '') {
            Ext.MessageBox.alert('PRAXIS', "Select Search Type", function (btn, text) {
                if (btn === 'ok' || btn === 'cancel')
                    setTimeout("Ext.getCmp(prototype.id + '-search-type').focus();", 100);
            });
            return;
        }
        if (txtDateFrom === '') {
            Ext.MessageBox.alert('PRAXIS', "Enter Date From", function (btn, text) {
                if (btn === 'ok' || btn === 'cancel')
                    setTimeout("Ext.getCmp(prototype.id + '-txtFilterDateFrom').focus();", 100);
            });
            return;
        }
        if (txtDateTo === '') {
            Ext.MessageBox.alert('PRAXIS', "Enter Date To", function (btn, text) {
                if (btn === 'ok' || btn === 'cancel')
                    setTimeout("Ext.getCmp(prototype.id + '-txtFilterDateTo').focus();", 100);
            });
            return;
        }
        if (txtDateFrom !== '' && txtDateTo !== '') {

            if (global.existeFecha(txtDateFrom) !== '') {
                Ext.MessageBox.alert('PRAXIS', global.existeFecha(txtDateFrom), function (btn, text) {
                    if (btn === 'ok' || btn === 'cancel')
                        setTimeout("Ext.getCmp(prototype.id + '-txtFilterDateFrom').focus();", 100);
                });
                return;
            }

            if (global.existeFecha(txtDateTo) !== '') {
                Ext.MessageBox.alert('PRAXIS', global.existeFecha(txtDateTo), function (btn, text) {
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
        //datos capturados del texto
        me.bean.IN_OPTION = cmbsearch;
        me.bean.IN_DATEFROM = txtDateFrom;
        me.bean.IN_DATETO = txtDateTo;
        me.bean.IN_STATUS = CmbStatus;
        me.bean.IN_COUNTRY = txtcountry;
        me.bean.IN_NAME = txtFile;

        me.SearchReportRFND(me.bean, obj === true ? obj : false);

    },
    SearchReportRFND: function (bean, bExcel) {
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
                        Ext.getCmp(prototype.id + '-lbl-total').setText(records[0].data.A3280TOTALPAGI);
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
    onExcelClick: function (obj, e) {
        this.searchform_detalle_Dispute_excel();
    },
    onFilterClick: function () {
        var option = Ext.getCmp(prototype.id + '-contentFilter');
        if (option.isVisible())
            option.hide();
        else
            option.show();
    },
    onClearClick: function (obj, e) {
        Ext.getCmp(prototype.id + '-gridData').setVisible(true);
        Ext.getCmp(prototype.id + '-lbl-total').setVisible(true);
        Ext.getCmp(prototype.id + '-contenedor-filters').setVisible(true); 
        
        Ext.getCmp(prototype.id + '-btn-search').setVisible(true);
        Ext.getCmp(prototype.id + '-btn-filter').setVisible(true);
        Ext.getCmp(prototype.id + '-btn-excel').setVisible(true);
         
        //Ext.getCmp(prototype.id + '-contenedor-options').setVisible(true); 
        Ext.getCmp(prototype.id + '-lbl-total').setText('0');
        Ext.getCmp(prototype.id + '-gridData').getStore().removeAll();

        Ext.getCmp(prototype.id + '-lbl-totalDeta').setText('0');
        Ext.getCmp(prototype.id + '-gridDetalle').getStore().removeAll();
        Ext.getCmp(prototype.id + '-gridDetalle').setVisible(false);
        Ext.getCmp(prototype.id + '-lbl-totalDeta').setVisible(false);
        Ext.getCmp(prototype.id + '-btn-back').setVisible(false);
        Ext.getCmp(prototype.id + '-btn-File').setVisible(false);
    },
    searchform_detalle_Dispute_excel: function () {
        var me = this;
        if (this.bean2.IN_COUNTRY !== '') {
            me.exportExcel(prototype.url + '/getXLSX?beanString=' + encodeURI(JSON.stringify(this.bean)));
        } else {
            Ext.MessageBox.alert('PRAXIS', "Select Country");
            return;
        }
    },
    onRendererColumnOnPais: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = "font-weight:bold !important; color:blue !important; cursor: pointer !important; text-decoration: underline;";
        return '<span onclick="Ext.getCmp(prototype.id + \'-Contenedor\').getController().OnDetail01(' + rowIndex + ');">' + value + '</span>'
    },
    onRendererColumnAttr: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.tdAttr = 'data-qtip="' + value + '"';
        return value;
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
        this.bean2.IN_FDATE = rec.data.A3280FDATE;
        this.bean2.IN_COUNTRY = rec.data.A3280PAIS;
        this.bean2.IN_SEQ = rec.data.A3280SEQ;
        Ext.getCmp(prototype.id + '-gridDetalle').getStore().removeAll();
        Ext.getCmp(prototype.id + '-gridDetalle').getStore().loadPage(1, {
            params: {
                beanString: JSON.stringify(this.bean2)

            }, callback: function (records, operation, success) {
                if (records.length !== 0) {
                    Ext.getCmp(prototype.id + '-lbl-totalDeta').setText(records[0].data.A3280TOTALPAGI);
                } else {
                    Ext.getCmp(prototype.id + '-lbl-totalDeta').setText('0');
                    global.Msg({msg: "Data not found.", icon: 2, fn: function () {
                        }});

                }

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
                    VL_A3280FDATE = Ext.String.trim(row.get('A3280FDATE'));
                    lstNewList.push(row.data);
                } else {
                    if (VL_A3280FDATE !== row.get('A3280FDATE')) {
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
                        VL_A3280DESDE = lstNewList[z].A3280FDATE;
                        vl_total_regsta=vl_total_reg;
                    }
                    vl_total_regsta = (vl_total_regsta - 1);
                    if (vl_total_regsta === 0) {
                        VL_A3280HASTA = lstNewList[z].A3280FDATE;
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
    onFileClick: function () {
        var me = this;
        var VL_A3280DESDE = '';
        var VL_A3280COUNTRY = '';
        var grid = Ext.getCmp(prototype.id + '-gridDetalle');
        for (var w = 0; w < grid.getStore().data.length; w++) {
            var record = grid.getStore().getAt(w);
            if (w === 0) {
                VL_A3280DESDE = record.data.A3280FDATE;
                VL_A3280COUNTRY = record.data.A3280PAIS;
            }
        }
        me.beanDownload.IN_DATEFROM = VL_A3280DESDE;
        me.beanDownload.IN_COUNTRY = VL_A3280COUNTRY;
        me.exportFiles(prototype.url + '/downloadFile?beanString=' + encodeURI(JSON.stringify(me.beanDownload)));
    }

});