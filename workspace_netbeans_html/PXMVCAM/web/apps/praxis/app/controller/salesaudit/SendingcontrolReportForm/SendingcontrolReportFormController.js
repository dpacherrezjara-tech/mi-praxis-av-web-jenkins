
Ext.define('Ext.Praxis.controller.salesaudit.SendingcontrolReportForm.SendingcontrolReportFormController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.SendingcontrolReportFormController',

    /**
     * Constructor
     */
    bean: {},
    beanDownload: {},
    bean2: {},
    /**
     * Constructor
     */

    init: function (view) {
        var me = this;
        me.setStoresFilters();

    },
    /**
     * Se ejecuta luego de haber cargado todos los componentes
     */
    afterRender: function () {
        this.setStores();
    },
    onRendererColumnOnTime: function (value, metaData, record, rowIndex, colIndex, store, view) {
        switch (Ext.String.trim(record.get('A3949ESTAD'))) {
            case 'M':
                value = 'orange';
                break;
            case 'A':
                value = 'green';
                break;
            case 'Y':
                value = '#CC9900';
                //value = 'silver';
                break;
            default:
                value = 'red';
        }
        return '<i class="fas fa-circle" style="font-size: 16px; color:' + value + ';"></i>';
    },
    OnBeforeShow: function () {
        prototype.idSendingcontrol = 'SendingcontrolReportForm';
        prototype.url = CONTEXTPATH + '/SendingcontrolReportForm';
        prototype.widthWindow = 1000;
        prototype.heightWindow = 768;
    },
    setStores: function () {
        var grid01 = Ext.getCmp(prototype.idSendingcontrol + '-gridData');
        var grid02 = Ext.getCmp(prototype.idSendingcontrol + '-gridDetalle');

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
        var cmbSearch = Ext.getCmp(prototype.idSendingcontrol + '-search-type');
        var cmbStatus = Ext.getCmp(prototype.idSendingcontrol + '-CmbStatus');
        var CmbType = Ext.getCmp(prototype.idSendingcontrol + '-CmbType');

        cmbSearch.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "", "name": "SELECTED"},
                {"code": "1", "name": "SYSTEM DATE"},
                {"code": "2", "name": "EXECUTION DATE"}
            ]
        }));

        cmbStatus.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "", "name": "ALL"},
                {"code": "E", "name": "ERROR IN THE PROCESS"},
                {"code": "T", "name": "SEND"},
                {"code": "M", "name": "EXCEED THE LIMIT OF THE MAIL"}
            ]
        }));

        CmbType.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "", "name": "ALL"},
                {"code": "DF", "name": "FILE DOWNLOAD"},
                {"code": "DN", "name": "NON COMPARATIVES"},
                {"code": "DC", "name": "COMPARATIVES"}
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
        Ext.getCmp(prototype.idSendingcontrol + '-gridData').setVisible(true);
        Ext.getCmp(prototype.idSendingcontrol + '-lbl-total').setVisible(true);
        Ext.getCmp(prototype.idSendingcontrol + '-btn-ListFiles').setVisible(true);
        Ext.getCmp(prototype.idSendingcontrol + '-contenedor-filters').setVisible(true);
        Ext.getCmp(prototype.idSendingcontrol + '-btn-search').setVisible(true);
        Ext.getCmp(prototype.idSendingcontrol + '-btn-filter').setVisible(true);
        Ext.getCmp(prototype.idSendingcontrol + '-btn-excel').setVisible(true);
        // Ext.getCmp(prototype.idSendingcontrol + '-contenedor-options').setVisible(true); 

        //Ext.getCmp(prototype.idSendingcontrol + '-lbl-total').setText('0');
        Ext.getCmp(prototype.idSendingcontrol + '-gridDetalle').setVisible(false);
        Ext.getCmp(prototype.idSendingcontrol + '-lbl-totalDeta').setVisible(false);
        Ext.getCmp(prototype.idSendingcontrol + '-btn-back').setVisible(false);
        Ext.getCmp(prototype.idSendingcontrol + '-btn-File').setVisible(false);
    },
    imgSearch_clickHandler: function (obj, records, eOpts) {
        var me = this;
        var cmbsearch = Ext.getCmp(prototype.idSendingcontrol + '-search-type').getValue();
        var txtDateFrom = Ext.getCmp(prototype.idSendingcontrol + '-txtFilterDateFrom').getRawValue();
        var txtDateTo = Ext.getCmp(prototype.idSendingcontrol + '-txtFilterDateTo').getRawValue();
        var txtcountry = Ext.getCmp(prototype.idSendingcontrol + '-country').getValue();
        var CmbStatus = Ext.getCmp(prototype.idSendingcontrol + '-CmbStatus').getValue();
        var CmbType = Ext.getCmp(prototype.idSendingcontrol + '-CmbType').getValue();
        if (cmbsearch === '') {
            Ext.MessageBox.alert('PRAXIS', "Select Search Type", function (btn, text) {
                if (btn === 'ok' || btn === 'cancel')
                    setTimeout("Ext.getCmp(prototype.idSendingcontrol + '-search-type').focus();", 100);
            });
            return;
        }
        if (txtDateFrom === '') {
            Ext.MessageBox.alert('PRAXIS', "Enter Date From", function (btn, text) {
                if (btn === 'ok' || btn === 'cancel')
                    setTimeout("Ext.getCmp(prototype.idSendingcontrol + '-txtFilterDateFrom').focus();", 100);
            });
            return;
        }
        if (txtDateTo === '') {
            Ext.MessageBox.alert('PRAXIS', "Enter Date To", function (btn, text) {
                if (btn === 'ok' || btn === 'cancel')
                    setTimeout("Ext.getCmp(prototype.idSendingcontrol + '-txtFilterDateTo').focus();", 100);
            });
            return;
        }
        if (txtDateFrom !== '' && txtDateTo !== '') {

            if (global.existeFecha(txtDateFrom) !== '') {
                Ext.MessageBox.alert('PRAXIS', global.existeFecha(txtDateFrom), function (btn, text) {
                    if (btn === 'ok' || btn === 'cancel')
                        setTimeout("Ext.getCmp(prototype.idSendingcontrol + '-txtFilterDateFrom').focus();", 100);
                });
                return;
            }

            if (global.existeFecha(txtDateTo) !== '') {
                Ext.MessageBox.alert('PRAXIS', global.existeFecha(txtDateTo), function (btn, text) {
                    if (btn === 'ok' || btn === 'cancel')
                        setTimeout("Ext.getCmp(prototype.idSendingcontrol + '-txtFilterDateTo').focus();", 100);
                });
                return;
            }
        }
        //datos capturados del texto
        me.bean.IN_OPTION = cmbsearch;
        me.bean.IN_DATEFROM = txtDateFrom;
        me.bean.IN_DATETO = txtDateTo;
        me.bean.IN_STATUS = CmbStatus;
        me.bean.IN_COUNTRY = txtcountry;
        me.bean.IN_TYPE = CmbType;

        me.SearchReportRFND(me.bean, obj === true ? obj : false);

    },
    SearchReportRFND: function (bean, bExcel) {
        var me = this;
        if (bExcel) {
            me.exportExcel(prototype.url + '/getXLSX?beanString=' + encodeURI(JSON.stringify(bean)));
        } else {
            Ext.getCmp(prototype.idSendingcontrol + '-gridData').getStore().removeAll();
            Ext.getCmp(prototype.idSendingcontrol + '-gridData').getStore().loadPage(1, {
                params: {
                    beanString: JSON.stringify(bean)

                }, callback: function (records, operation, success) {
                    if (records.length !== 0) {
                        Ext.getCmp(prototype.idSendingcontrol + '-lbl-total').setText(records[0].data.A3949COUNT2);
                    } else {
                        Ext.getCmp(prototype.idSendingcontrol + '-lbl-total').setText('0');
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
        var option = Ext.getCmp(prototype.idSendingcontrol + '-contentFilter');
        if (option.isVisible())
            option.hide();
        else
            option.show();
    },
    onClearClick: function (obj, e) {
        Ext.getCmp(prototype.idSendingcontrol + '-gridData').setVisible(true);
        Ext.getCmp(prototype.idSendingcontrol + '-lbl-total').setVisible(true);
        Ext.getCmp(prototype.idSendingcontrol + '-contenedor-filters').setVisible(true);

        Ext.getCmp(prototype.idSendingcontrol + '-btn-search').setVisible(true);
        Ext.getCmp(prototype.idSendingcontrol + '-btn-filter').setVisible(true);
        Ext.getCmp(prototype.idSendingcontrol + '-btn-excel').setVisible(true);

        //Ext.getCmp(prototype.idSendingcontrol + '-contenedor-options').setVisible(true); 
        Ext.getCmp(prototype.idSendingcontrol + '-lbl-total').setText('0');
        Ext.getCmp(prototype.idSendingcontrol + '-gridData').getStore().removeAll();

        Ext.getCmp(prototype.idSendingcontrol + '-lbl-totalDeta').setText('0');
        Ext.getCmp(prototype.idSendingcontrol + '-gridDetalle').getStore().removeAll();
        Ext.getCmp(prototype.idSendingcontrol + '-gridDetalle').setVisible(false);
        Ext.getCmp(prototype.idSendingcontrol + '-lbl-totalDeta').setVisible(false);
        Ext.getCmp(prototype.idSendingcontrol + '-btn-back').setVisible(false);
        Ext.getCmp(prototype.idSendingcontrol + '-btn-File').setVisible(false);
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
    onRendererColumn: function (value, metaData, record, rowIndex, colIndex, store, view) {
        switch (String(record.get('A3949TYPE'))) {
            case 'DF':
                value = 'FILE DOWNLOAD';
                break;
            case 'DN':
                value = 'NON COMPARATIVES';
                break;
            case 'DC':
                value = 'COMPARATIVES';
                break;
        }
        metaData.tdAttr = 'data-qtip="' + value + '"';
        return value;
    },
    onRendererColumnOnPais: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = "font-weight:bold !important; color:blue !important; cursor: pointer !important; text-decoration: underline;";
        return '<span onclick="Ext.getCmp(prototype.idSendingcontrol + \'-Contenedor\').getController().OnDetail01(' + rowIndex + ');">' + value + '</span>'
    },
    onRendererColumnAttr: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.tdAttr = 'data-qtip="' + value + '"';
        return value;
    },
    OnDetail01: function (rowIndex) {
        var gridData = Ext.getCmp(prototype.idSendingcontrol + '-gridData');
        var total = Ext.getCmp(prototype.idSendingcontrol + '-lbl-total');

        var gridDetalle = Ext.getCmp(prototype.idSendingcontrol + '-gridDetalle');
        var totalDeta = Ext.getCmp(prototype.idSendingcontrol + '-lbl-totalDeta');
        var back = Ext.getCmp(prototype.idSendingcontrol + '-btn-back');
        Ext.getCmp(prototype.idSendingcontrol + '-btn-File').setVisible(true);
        Ext.getCmp(prototype.idSendingcontrol + '-btn-ListFiles').setVisible(false);
        Ext.getCmp(prototype.idSendingcontrol + '-contenedor-filters').setVisible(false);
        Ext.getCmp(prototype.idSendingcontrol + '-btn-search').setVisible(false);
        Ext.getCmp(prototype.idSendingcontrol + '-btn-filter').setVisible(false);
        Ext.getCmp(prototype.idSendingcontrol + '-btn-excel').setVisible(false);
        //Ext.getCmp(prototype.idSendingcontrol + '-contenedor-options').setVisible(false); 

        gridData.hide();
        total.hide();

        gridDetalle.show();
        totalDeta.show();
        back.show();

        ///CARGANDO EL DETALLE DE LA GRTILLA 
        var grid = Ext.getCmp(prototype.idSendingcontrol + '-gridData');
        var store = grid.getStore();
        var rec = store.getAt(rowIndex);

        this.bean2.IN_OPTION = '3';
        this.bean2.IN_DATEFROM = rec.data.A3949FDATE;
        this.bean2.IN_COUNTRY = rec.data.A3949PAIS;
        this.bean2.IN_SEQ = rec.data.A3949SEQ;
        this.bean2.IN_TYPE = rec.data.A3949TYPE;
        Ext.getCmp(prototype.idSendingcontrol + '-gridDetalle').getStore().removeAll();
        Ext.getCmp(prototype.idSendingcontrol + '-gridDetalle').getStore().loadPage(1, {
            params: {
                beanString: JSON.stringify(this.bean2)

            }, callback: function (records, operation, success) {
                if (records.length !== 0) {
                    Ext.getCmp(prototype.idSendingcontrol + '-lbl-totalDeta').setText(records[0].data.A3949COUNT2);
                } else {
                    Ext.getCmp(prototype.idSendingcontrol + '-lbl-totalDeta').setText('0');
                    global.Msg({msg: "Data not found.", icon: 2, fn: function () {
                        }});

                }

            }
        });


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
        var CmbType = Ext.getCmp(prototype.idSendingcontrol + '-CmbType').getValue();
        if (CmbType === '') {
            Ext.MessageBox.alert('PRAXIS', "Select Type", function (btn, text) {
                if (btn === 'ok' || btn === 'cancel')
                    setTimeout("Ext.getCmp(prototype.idSendingcontrol + '-CmbType').focus();", 100);
            });
            return;
        }
        var grid = Ext.getCmp(prototype.idSendingcontrol + '-gridData');
        if (grid.getSelectionModel().hasSelection()) {
            var selection = grid.getSelectionModel().getSelected();
            for (var i = 0; i < selection.length; i++) {
                var row = grid.getSelectionModel().getSelection()[i];
                if (i === 0) {
                    VL_A3280FDATE = Ext.String.trim(row.get('A3949FDATE'));
                    lstNewList.push(row.data);
                } else {
                    if (VL_A3280FDATE !== row.get('A3949FDATE')) {
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
                        VL_A3280DESDE = lstNewList[z].A3949FDATE;
                        vl_total_regsta = vl_total_reg;
                    }
                    vl_total_regsta = (vl_total_regsta - 1);
                    if (vl_total_regsta === 0) {
                        VL_A3280HASTA = lstNewList[z].A3949FDATE;
                    }
                }

                me.beanDownload.IN_DATEFROM = VL_A3280DESDE;
                me.beanDownload.IN_DATETO = VL_A3280HASTA;
                me.beanDownload.IN_TYPE = CmbType;
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
        var CmbType = Ext.getCmp(prototype.idSendingcontrol + '-CmbType').getValue();
        if (CmbType === '') {
            Ext.MessageBox.alert('PRAXIS', "Select Type", function (btn, text) {
                if (btn === 'ok' || btn === 'cancel')
                    setTimeout("Ext.getCmp(prototype.idSendingcontrol + '-CmbType').focus();", 100);
            });
            return;
        }
        var grid = Ext.getCmp(prototype.idSendingcontrol + '-gridDetalle');
        for (var w = 0; w < grid.getStore().data.length; w++) {
            var record = grid.getStore().getAt(w);
            if (w === 0) {
                VL_A3280DESDE = record.data.A3949FDATE;
                VL_A3280COUNTRY = record.data.A3949PAIS;
            }
        }
        me.beanDownload.IN_DATEFROM = VL_A3280DESDE;
        me.beanDownload.IN_COUNTRY = VL_A3280COUNTRY;
        me.beanDownload.IN_TYPE = CmbType;
        me.exportFiles(prototype.url + '/downloadFile?beanString=' + encodeURI(JSON.stringify(me.beanDownload)));
    }

});
