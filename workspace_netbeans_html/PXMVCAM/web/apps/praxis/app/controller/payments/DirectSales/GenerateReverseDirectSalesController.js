Ext.define('Ext.Praxis.controller.payments.DirectSales.GenerateReverseDirectSalesController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.GenerateReverseDirectSalesController',

    onWinAfterRender: function () {
        this.obtainDateCombos();
        this.enableSelectionTracking();
        this.setupConciliadoTip();
    },

    // Tooltip "INVOICE CONCILIADO" al pasar el mouse sobre una fila ya
    // generada (misma clase CSS que usa getRowClass en la vista, ver
    // GenerateReverseForm.js). Se ata a la vista del grid, no a una columna,
    // para que aplique en toda la fila.
    setupConciliadoTip: function () {
        var grid = Ext.getCmp(prototype.id + '-grv-grid');
        Ext.create('Ext.tip.ToolTip', {
            target: grid.getView().el,
            delegate: '.grv-row-conciliado',
            trackMouse: true,
            dismissDelay: 0,
            html: 'INVOICE CONCILIADO'
        });
    },

    // Habilita/deshabilita los botones de acción masiva según haya o no filas
    // seleccionadas en la grilla (checkboxmodel).
    enableSelectionTracking: function () {
        var grid = Ext.getCmp(prototype.id + '-grv-grid');
        var btnRev = Ext.getCmp(prototype.id + '-grv-btnReversaMasiva');
        var btnGen = Ext.getCmp(prototype.id + '-grv-btnGenerarMasivo');
        grid.getSelectionModel().on('selectionchange', function (sm, selected) {
            var hasSelection = selected.length > 0;
            btnRev.setDisabled(!hasSelection);
            btnGen.setDisabled(!hasSelection);
        });
    },

    // Solo llena los combos de fecha (Sales Date From/To). Country/Currency/
    // Customer no aplican a este preview: el backend (pendiente) definirá qué
    // catálogos hacen falta cuando se conecten los procesos reales.
    obtainDateCombos: function () {
        var fechaActual = new Date();
        var yearActual = fechaActual.getFullYear();

        Ext.getCmp(prototype.id + '-grv-cmbDateFromYear').bindStore(win.getStoreYear(true));
        Ext.getCmp(prototype.id + '-grv-cmbDateToYear').bindStore(win.getStoreYear(true));
        Ext.getCmp(prototype.id + '-grv-cmbDateFromMonth').bindStore(win.getStoreMonth(true));
        Ext.getCmp(prototype.id + '-grv-cmbDateToMonth').bindStore(win.getStoreMonth(true));
        Ext.getCmp(prototype.id + '-grv-cmbDateFromDay').bindStore(win.getStoreDays(true));
        Ext.getCmp(prototype.id + '-grv-cmbDateToDay').bindStore(win.getStoreDays(true));

        Ext.getCmp(prototype.id + '-grv-cmbDateFromYear').setValue(yearActual);
        Ext.getCmp(prototype.id + '-grv-cmbDateToYear').setValue(yearActual);
        Ext.getCmp(prototype.id + '-grv-cmbDateFromMonth').setValue('');
        Ext.getCmp(prototype.id + '-grv-cmbDateToMonth').setValue('');
        Ext.getCmp(prototype.id + '-grv-cmbDateFromDay').setValue('');
        Ext.getCmp(prototype.id + '-grv-cmbDateToDay').setValue('');
    },

    selectComboFromYear: function (obj) {
        var comboToYear = Ext.getCmp(prototype.id + '-grv-cmbDateToYear');
        comboToYear.bindStore(win.getStoreYear2(false, obj.getValue()));
        comboToYear.setValue(obj.getValue());
    },

    selectComboFromMonth: function (obj) {
        Ext.getCmp(prototype.id + '-grv-cmbDateToMonth').setValue(obj.getValue());
    },

    selectComboFromDay: function (obj) {
        Ext.getCmp(prototype.id + '-grv-cmbDateToDay').setValue(obj.getValue());
    },

    buildDate: function (y, m, d) {
        y = String(y || '').trim();
        m = String(m || '').trim();
        d = String(d || '').trim();

        if (!y) {
            return '';
        }
        if (m) {
            m = m.padStart(2, '0');
            if (d) {
                d = d.padStart(2, '0');
            }
        }
        return y + m + d;
    },

    eventKey: function (e, eOpts) {
        if (eOpts.getKey() === 13) {
            this.btnSearch_click();
        }
    },

    btnClear_click: function () {
        Ext.getCmp(prototype.id + '-grv-txtAgent').setValue('');
        this.obtainDateCombos();
        Ext.getCmp(prototype.id + '-grv-grid').getStore().loadData([]);
    },

    // Llama a MPS738 (DirectSales/searchGenerateReverse): trae las ventas
    // agrupadas por INVOICE/SCOUNTRY/SAGENT/SUBFTE/SDATE/SCURRENCY/CCUST con
    // SUM(SVFOPNETR) < 0, candidatas a Reversa/Generar. IN_SAGENT vacio =
    // todos los agentes (filtro/reglas "en duro" de CCUST/INVOICE/SUBFTE
    // quedan en el propio stored procedure).
    btnSearch_click: function () {
        var grid = Ext.getCmp(prototype.id + '-grv-grid');
        var bean = {};
        bean.IN_SAGENT = Ext.getCmp(prototype.id + '-grv-txtAgent').getValue() || '';
        bean.IN_DATE_FROM = this.buildDate(
                Ext.getCmp(prototype.id + '-grv-cmbDateFromYear').getValue(),
                Ext.getCmp(prototype.id + '-grv-cmbDateFromMonth').getValue(),
                Ext.getCmp(prototype.id + '-grv-cmbDateFromDay').getValue()
                );
        bean.IN_DATE_TO = this.buildDate(
                Ext.getCmp(prototype.id + '-grv-cmbDateToYear').getValue(),
                Ext.getCmp(prototype.id + '-grv-cmbDateToMonth').getValue(),
                Ext.getCmp(prototype.id + '-grv-cmbDateToDay').getValue()
                );

        if (!bean.IN_DATE_FROM || !bean.IN_DATE_TO) {
            Ext.Msg.alert('.:PRAXIS:.', 'Please select the Sales Date From/To range.');
            return;
        }

        grid.mask('Searching...');

        Ext.Ajax.request({
            url: prototype.url + '/searchGenerateReverse',
            method: 'POST',
            timeout: 60000000,
            params: {beanString: JSON.stringify(bean)},
            success: function (response) {
                grid.unmask();
                var res = Ext.JSON.decode(response.responseText);
                if (!res.success) {
                    global.Msg({msg: res.message || 'Error searching Direct Sales.'});
                    grid.getStore().loadData([]);
                    return;
                }
                var data = res.data || [];
                grid.getStore().loadData(data);
                if (data.length === 0) {
                    global.Msg({msg: 'Data not found.'});
                }
            },
            failure: function () {
                grid.unmask();
                Ext.Msg.alert('Error', 'Connection error. Please try again.');
            }
        });
    },

    // Reversa individual llama al backend (MPS740), contraparte de MPS739.
    // Se confirma antes porque borra MPF199/MPF190 y deja MPF300 pendiente
    // otra vez. La version masiva (N filas seleccionadas) esta mas abajo,
    // en onReversaMasivaClick/doReversaMasiva (MPS742).
    onReversaClick: function (column, cell, rowIndex, colIndex, e, record) {
        var data = record.data;
        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: 'Reversar el ajuste del Invoice <b>' + data.INVOICE + '</b> (Agente ' + data.SAGENT
                    + ', Bandoc ' + (data.BANDOC || '-') + ')?',
            buttons: Ext.MessageBox.YESNO,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            scope: this,
            fn: function (btn) {
                if (btn === 'yes') {
                    this.doReversa(data);
                }
            }
        });
    },

    doReversa: function (data) {
        var grid = Ext.getCmp(prototype.id + '-grv-grid');
        var bean = {
            CCUST: data.CCUST,
            SCOUNTRY: data.SCOUNTRY,
            SDATE: data.SDATE,
            SAGENT: data.SAGENT,
            SUBFTE: data.SUBFTE,
            INVOICE: data.INVOICE,
            SCURRENCY: data.SCURRENCY
        };

        grid.mask('Reversando...');

        Ext.Ajax.request({
            url: prototype.url + '/reverseDirectSales',
            method: 'POST',
            timeout: 60000000,
            params: {beanString: JSON.stringify(bean)},
            scope: this,
            success: function (response) {
                grid.unmask();
                var res = Ext.JSON.decode(response.responseText);
                Ext.Msg.show({
                    title: '.:PRAXIS:.',
                    msg: res.message || (res.success ? 'Reversado correctamente.' : 'Error al reversar.'),
                    buttons: Ext.MessageBox.OK,
                    icon: res.success ? Ext.MessageBox.INFO : Ext.MessageBox.WARNING,
                    scope: this,
                    fn: function () {
                        if (res.success) {
                            this.btnSearch_click();
                        }
                    }
                });
            },
            failure: function () {
                grid.unmask();
                Ext.Msg.alert('Error', 'Connection error. Please try again.');
            }
        });
    },

    // Generar individual SI llama al backend (MPS739). Se confirma antes de
    // ejecutar porque crea registros en MPF199/MPF190 y actualiza MPF300.
    onGenerarClick: function (column, cell, rowIndex, colIndex, e, record) {
        var data = record.data;
        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: 'Generar el ajuste para Invoice <b>' + data.INVOICE + '</b> (Agente ' + data.SAGENT
                    + ', ' + Ext.util.Format.number(data.MONTO, '0,000.00') + ' ' + data.SCURRENCY + ')?',
            buttons: Ext.MessageBox.YESNO,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            scope: this,
            fn: function (btn) {
                if (btn === 'yes') {
                    this.doGenerar(data);
                }
            }
        });
    },

    doGenerar: function (data) {
        var grid = Ext.getCmp(prototype.id + '-grv-grid');
        var bean = {
            CCUST: data.CCUST,
            SCOUNTRY: data.SCOUNTRY,
            SDATE: data.SDATE,
            SAGENT: data.SAGENT,
            SUBFTE: data.SUBFTE,
            INVOICE: data.INVOICE,
            SCURRENCY: data.SCURRENCY
        };

        grid.mask('Generando...');

        Ext.Ajax.request({
            url: prototype.url + '/generateDirectSales',
            method: 'POST',
            timeout: 60000000,
            params: {beanString: JSON.stringify(bean)},
            scope: this,
            success: function (response) {
                grid.unmask();
                var res = Ext.JSON.decode(response.responseText);
                Ext.Msg.show({
                    title: '.:PRAXIS:.',
                    msg: res.message || (res.success ? 'Generado correctamente.' : 'Error al generar.'),
                    buttons: Ext.MessageBox.OK,
                    icon: res.success ? Ext.MessageBox.INFO : Ext.MessageBox.WARNING,
                    scope: this,
                    fn: function () {
                        if (res.success) {
                            this.btnSearch_click();
                        }
                    }
                });
            },
            failure: function () {
                grid.unmask();
                Ext.Msg.alert('Error', 'Connection error. Please try again.');
            }
        });
    },

    // Arma el payload {rows:[...]} con la misma llave de 7 campos que usan
    // MPS739/MPS740 individuales; el DAO lo convierte al string delimitado
    // que esperan MPS741/MPS742.
    buildRowsPayload: function (records) {
        return records.map(function (r) {
            var data = r.data;
            return {
                CCUST: data.CCUST,
                SCOUNTRY: data.SCOUNTRY,
                SDATE: data.SDATE,
                SAGENT: data.SAGENT,
                SUBFTE: data.SUBFTE,
                INVOICE: data.INVOICE,
                SCURRENCY: data.SCURRENCY
            };
        });
    },

    // MPS741/MPS742 devuelven un solo texto tipo "3 generado(s), 2 con
    // error. Detalle: INVOICE: motivo | INVOICE: motivo". Se parte en un
    // resumen + una tabla Invoice/Motivo en vez de mostrar ese texto largo
    // tal cual en un alert.
    showBatchResult: function (title, message) {
        message = message || '';
        var marker = 'Detalle:';
        var detailIdx = message.indexOf(marker);
        var summary = detailIdx >= 0 ? message.substring(0, detailIdx).trim() : message;
        var detailStr = detailIdx >= 0 ? message.substring(detailIdx + marker.length).trim() : '';

        if (!detailStr) {
            Ext.Msg.show({
                title: '.:PRAXIS:.',
                msg: summary || 'Proceso finalizado.',
                buttons: Ext.MessageBox.OK,
                icon: Ext.MessageBox.INFO,
                scope: this,
                fn: function () {
                    this.btnSearch_click();
                }
            });
            return;
        }

        var rowsHtml = '';
        Ext.Array.each(detailStr.split(' | '), function (entry) {
            var sepIdx = entry.indexOf(': ');
            var invoice = sepIdx >= 0 ? entry.substring(0, sepIdx) : entry;
            var reason = sepIdx >= 0 ? entry.substring(sepIdx + 2) : '';
            rowsHtml += '<tr>'
                    + '<td style="padding:4px 8px; border-bottom:1px solid #ddd; font-size:11px;">' + invoice + '</td>'
                    + '<td style="padding:4px 8px; border-bottom:1px solid #ddd; color:#a04000;">' + reason + '</td>'
                    + '</tr>';
        });

        var html = '<div style="font-weight:bold; margin-bottom:10px;">' + summary + '</div>'
                + '<table style="font-size:12px; border-collapse:collapse; width:100%;">'
                + '<tr style="background:#6C87A8; color:#fff;">'
                + '<th style="padding:4px 8px; text-align:left;">Invoice</th>'
                + '<th style="padding:4px 8px; text-align:left;">Motivo</th>'
                + '</tr>'
                + rowsHtml
                + '</table>';

        Ext.create('Ext.window.Window', {
            title: title,
            modal: true,
            width: 640,
            height: 420,
            resizable: true,
            layout: 'fit',
            bodyStyle: 'background:#fff;',
            items: [
                {
                    xtype: 'panel',
                    border: false,
                    autoScroll: true,
                    bodyPadding: 14,
                    html: html
                }
            ],
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'bottom',
                    ui: 'footer',
                    layout: {pack: 'center'},
                    items: [
                        {
                            text: 'Close',
                            iconCls: 'prx-icon-cancel',
                            scope: this,
                            handler: function (btn) {
                                btn.up('window').close();
                                this.btnSearch_click();
                            }
                        }
                    ]
                }
            ]
        }).show();
    },

    onReversaMasivaClick: function () {
        var selected = Ext.getCmp(prototype.id + '-grv-grid').getSelectionModel().getSelection();
        if (!selected || selected.length === 0) {
            Ext.Msg.alert('.:PRAXIS:.', 'Please select at least one row.');
            return;
        }
        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: 'Reversar <b>' + selected.length + '</b> registro(s) seleccionado(s)?',
            buttons: Ext.MessageBox.YESNO,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            scope: this,
            fn: function (btn) {
                if (btn === 'yes') {
                    this.doReversaMasiva(selected);
                }
            }
        });
    },

    doReversaMasiva: function (selected) {
        var grid = Ext.getCmp(prototype.id + '-grv-grid');
        var payload = {rows: this.buildRowsPayload(selected)};

        grid.mask('Reversando...');

        Ext.Ajax.request({
            url: prototype.url + '/reverseDirectSalesMasivo',
            method: 'POST',
            timeout: 60000000,
            params: {beanString: JSON.stringify(payload)},
            scope: this,
            success: function (response) {
                grid.unmask();
                var res = Ext.JSON.decode(response.responseText);
                this.showBatchResult('Reversa Masiva - Resultado', res.message || (res.success ? 'Reversado correctamente.' : 'Error al reversar.'));
            },
            failure: function () {
                grid.unmask();
                Ext.Msg.alert('Error', 'Connection error. Please try again.');
            }
        });
    },

    onGenerarMasivoClick: function () {
        var selected = Ext.getCmp(prototype.id + '-grv-grid').getSelectionModel().getSelection();
        if (!selected || selected.length === 0) {
            Ext.Msg.alert('.:PRAXIS:.', 'Please select at least one row.');
            return;
        }
        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: 'Generar <b>' + selected.length + '</b> registro(s) seleccionado(s)?',
            buttons: Ext.MessageBox.YESNO,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            scope: this,
            fn: function (btn) {
                if (btn === 'yes') {
                    this.doGenerarMasivo(selected);
                }
            }
        });
    },

    doGenerarMasivo: function (selected) {
        var grid = Ext.getCmp(prototype.id + '-grv-grid');
        var payload = {rows: this.buildRowsPayload(selected)};

        grid.mask('Generando...');

        Ext.Ajax.request({
            url: prototype.url + '/generateDirectSalesMasivo',
            method: 'POST',
            timeout: 60000000,
            params: {beanString: JSON.stringify(payload)},
            scope: this,
            success: function (response) {
                grid.unmask();
                var res = Ext.JSON.decode(response.responseText);
                this.showBatchResult('Generar Masivo - Resultado', res.message || (res.success ? 'Generado correctamente.' : 'Error al generar.'));
            },
            failure: function () {
                grid.unmask();
                Ext.Msg.alert('Error', 'Connection error. Please try again.');
            }
        });
    },

    onCloseClick: function () {
        this.view.close();
    }
});
