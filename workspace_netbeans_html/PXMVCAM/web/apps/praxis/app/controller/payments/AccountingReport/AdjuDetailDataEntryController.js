Ext.define('Ext.Praxis.controller.payments.AccountingReport.AdjuDetailDataEntryController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.AdjuDetailDataEntryController',

    _settlements: [],
    _invoices: [],

    // Mapeo exacto: header visible → dataIndex
    // Settlements: sin COSTCEN
    _settlementsColumns: [
        { header: 'Agent',       field: 'SAGENT'     },
        { header: 'Merchant',    field: 'MERCHNC'    },
        { header: 'Country',     field: 'SCOUNTRY'   },
        { header: 'Sale Date',   field: 'SDATE'      },
        { header: 'Card Code',   field: 'SCARDN'     },
        { header: 'Auth Code',   field: 'SAUTHOC'    },
        { header: 'Currency',    field: 'SCURRENCY'  },
        { header: 'Amount',      field: 'SVFOP'      },
        { header: 'Curr. Rev.',  field: 'MONEDAPAGO' },
        { header: 'Amount Rev.', field: 'IMPORTEPAG' },
        { header: 'Account',     field: 'ACCNUMA'    }
    ],

    // Invoices: con ACCNUMA y COSTCEN
    _invoicesColumns: [
        { header: 'Ticket',       field: 'TICKET'    },
        { header: 'Invoice',      field: 'INVOICE'   },
        { header: 'Country',      field: 'SCOUNTRY'  },
        { header: 'Agent',        field: 'SAGENT'    },
        { header: 'Consolidator', field: 'SCONSOL'   },
        { header: 'Doc. Type',    field: 'TDOC'      },
        { header: 'Sale Date',    field: 'SDATE'     },
        { header: 'Card Code',    field: 'SCARDN'    },
        { header: 'Auth Code',    field: 'SAUTHOC'   },
        { header: 'Curr.',        field: 'SCURRENCY' },
        { header: 'Amount',       field: 'SVFOP'     },
        { header: 'Account',      field: 'ACCNUMA'   },
        { header: 'Cost Center',  field: 'COSTCEN'   }
    ],

    init: function (view) {},

    afterRender: function () {
        this.loadData();
    },

    loadData: async function () {
        const me = this;
        const mainForm    = Ext.getCmp(prototype.idAdju + '-mainInfo').getForm();
        const gridSettl   = Ext.getCmp(prototype.idAdju + '-gridSettl');
        const gridSale    = Ext.getCmp(prototype.idAdju + '-gridSale');
        const totalsSettl = Ext.getCmp(prototype.idAdju + '-totalsSettl').getForm();
        const totalsInvoi = Ext.getCmp(prototype.idAdju + '-totalsInvoi').getForm();
        let obj = me.view.obj;
        let searchParams = {
            'IN_DATEC':  obj.DATEC,
            'IN_TRANC':  obj.TRANC,
            'IN_CODPRO': obj.CODPRO
        };
        try {
            global.cleanPXobj(obj);
            mainForm.setValues(obj);
            me.view.setLoading(true);

            const res = await global.callStoreGet('PRAXISMP', 'MPS504', searchParams);

            // Invoices — lstRs[0]
            const invoices = res.lstRs.at(0);
            me._invoices = invoices;
            gridSale.setStore(new Ext.data.Store({ data: invoices }));
            totalsInvoi.setValues({
                totalRecords: invoices.length,
                totalAmount:  Ext.util.Format.number(global.sumBy(invoices, 'SVFOP'), '0,000.00')
            });

            // Settlements — lstRs[1]
            const settlements = res.lstRs.at(1);
            me._settlements = settlements;
            if (settlements.length > 0) {
                gridSettl.show();
                gridSettl.setStore(new Ext.data.Store({ data: settlements }));
                totalsSettl.setValues({
                    totalRecords: settlements.length,
                    totalLoc: Ext.util.Format.number(global.sumBy(settlements, 'SVFOP'),      '0,000.00'),
                    totalRev: Ext.util.Format.number(global.sumBy(settlements, 'IMPORTEPAG'), '0,000.00')
                });
            } else {
                gridSettl.hide();
            }
        } catch (e) {
            console.error(e);
            global.Msg({ msg: 'Error on Load' });
            me.view.close();
        } finally {
            me.view.center();
            me.view.setLoading(false);
        }
    },

    // Convierte los datos al formato { Header: value } usando el mapeo de columnas
    _mapForExcel: function (data, columns) {
        return data.map(function (row) {
            const mapped = {};
            columns.forEach(function (col) {
                mapped[col.header] = row[col.field] !== undefined ? row[col.field] : '';
            });
            return mapped;
        });
    },

    onDownloadExcel: async function () {
        const me = this;
        const obj = me.view.obj;
        const fileName = 'Adjustment_' + (obj.IDCADJ || obj.TRANC || 'detail');
        await global.writeExcelFromJsonMultiSheet({
            fileName: fileName,
            data: [
                {
                    sheetName: 'Settlements',
                    data: me._mapForExcel(me._settlements, me._settlementsColumns)
                },
                {
                    sheetName: 'Invoices',
                    data: me._mapForExcel(me._invoices, me._invoicesColumns)
                }
            ]
        });
    },

    onReloadInfo: function () {
        this.loadData();
    },

    onCancelClick: function () {
        this.view.close();
    }
});