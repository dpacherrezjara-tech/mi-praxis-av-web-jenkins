/* global axios */

//<editor-fold defaultstate="collapsed" desc="HELPERS">
// === Mapeo de cabeceras para Deposits ===
const depositsHeaders = {
    RN: "RN",
    CCUST: "CLIENT",
    PRDA: "PROCESSING DATE",
    NETO: "AMOUNT",
    SCURRENCY: "CURRENCY",
    STVAL: "STATUS",
    SCOUNTRY: "COUNTRY",
    TDOC: "DOC TYPE",
    CODEBANK: "BANK CODE",
    DESC_BANK: "BANK DESC.",
    ADATE: "PAYMENT DATE",
    TEXTO: "TEXT",
    TEXTOLAR: "LARGE TEXT",
    DATECI: "BANK DATE",
    TRANCI: "BANK TRANS.",
    CLAVE1: "KEY 1",
    CLAVE3: "KEY 2",
    COREP: "COD. PRO SUG",
    BANDOC: "BANK DOC.",
    VALDATE: "VALUE DATE",
    REFER: "REFERENCE",
    SOCIETY: "CLIENT CODE",
    ACCOUNT: "ACCOUNT",
    BENCENC: "PROFIT",
    ACCPROV: "PROVISION",
    FECPROV: "PRO. DATE"
};

// === Mapeo de cabeceras para Settlements ===
const settlementsHeaders = {
    RN: "RN",
    CCUST: "CLIENT",
    PRDA: "PROCESSING DATE",
    NETO: "AMOUNT",
    SCURRENCY: "CURRENCY",
    STVAL: "STATUS",
    SCOUNTRY: "COUNTRY",
    TDOC: "DOC TYPE",
    CODEBANK: "BANK CODE",
    DESC_BANK: "BANK DESC.",
    SDATE: "SALE DATE",
    SAGENT: "IATA",
    MERCHAND: "MERCHANT",
    SUCMERCH: "SUBMERCH",
    SCARCOD: "CARD CODE",
    SCARDN: "CARD NUMBER",
    SAUTHOC: "AUTH CODE",
    CODPRO: "PROCESS",
    TERMI: "TERMINAL",
    SVFOP: "SETTLEMENT AMOUNT",
    COMISION: "COMISION",
    TOTAL: "TOTAL",
    COMISTOTA: "TOTAL COMISION",
    MONEDAPAGO: "PAY CURRENCY",
    IMPORTEPAG: "PAY AMOUNT"
};

// === Función para transformar cabeceras ===
function mapHeaders(data, headersMap) {
    return data.map(row => {
        const newRow = {};
        for (const key in row) {
            if (headersMap[key]) {
                newRow[headersMap[key]] = row[key];
            } else {
                newRow[key] = row[key]; // dejar las que no estann en el mapeo
            }
        }
        return newRow;
    });
}
//</editor-fold>

Ext.define('Ext.Praxis.controller.payments.ExteriorBankReconciliation.ProcessBankReconciliationController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ProcessBankReconciliationController',
//    url: CONTEXTPATH + '/AccountingReport',
  //  request: axios.create({
  //      baseURL: CONTEXTPATH + '/AccountingReport',
   //     timeout: 0
   // }),
    notifier: new AWN(),
    
//<editor-fold defaultstate="collapsed" desc="onCancelClick">
    onCancelClick: function () {
        this.view.close();
    },
//</editor-fold>

//<editor-fold defaultstate="collapsed" desc="onProcessClick">
    onProcessClick: async function (btn) {
        const me = this;
        const params = me.formatParameters();

        // Validación simple de fechas
        const dateFrom = new Date(params.IN_DATE_FROM);
        const dateTo = new Date(params.IN_DATE_TO);
        if (dateFrom > dateTo) {
            Ext.Msg.alert('.:PRAXIS:.', 'The From date cannot be greater than the To date.');
            return;
        }

        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: 'Do you want to download the Excel?',
            buttons: Ext.MessageBox.YESNO,
            icon: Ext.MessageBox.QUESTION,
            scope: me,
            fn: async function (btnChoice) {
                if (btnChoice === 'yes') {
                   me.downloadExcel(params);
                  // me.loadDeposits(params);
                }
            }
        });
    },
//</editor-fold>

//<editor-fold defaultstate="collapsed" desc="formatParameters">
    formatParameters: function () {
       const values = Ext.getCmp(prototype.idDE + '-mainForm')
           .getForm()
           .getValues();

       return {
           IN_CCUST: values.IN_CCUST || 'ALL',
           IN_DATE_FROM: values.IN_DATE_FROM,
           IN_DATE_TO: values.IN_DATE_TO
       };
   },
//</editor-fold>

//<editor-fold defaultstate="collapsed" desc="downloadExcel">
    downloadExcel: async function (params) {
        const me = this;
        this.getView().setLoading(true);

        try {
            const formatParams = {
                IN_CCUST: params.IN_CCUST,
                IN_VALDATE_FROM: params.IN_DATE_FROM,
                IN_VALDATE_TO: params.IN_DATE_TO
            };

            const workbook = XLSX.utils.book_new();

            // === Deposits (MPS296) ===
            const storeDeposits = await global.callStoreGet('PRAXISMP', 'MPS296', formatParams);
            if (storeDeposits.lstRs && storeDeposits.lstRs.length > 0) {
                const dataDeposits = storeDeposits.lstRs[0];
                if (dataDeposits.length > 0) {
                    const mappedDeposits = mapHeaders(dataDeposits, depositsHeaders);
                    XLSX.utils.book_append_sheet(
                        workbook,
                        XLSX.utils.json_to_sheet(mappedDeposits),
                        'Deposits'
                    );
                }
            }

            // === Settlements (MPS297) ===
            const formatParams2 = {
                IN_CCUST: params.IN_CCUST,
                IN_PRDA_FROM: params.IN_DATE_FROM,
                IN_PRDA_TO: params.IN_DATE_TO
            };
            const storeSettlements = await global.callStoreGet('PRAXISMP', 'MPS297', formatParams2);
            if (storeSettlements.lstRs && storeSettlements.lstRs.length > 0) {
                const dataSettlements = storeSettlements.lstRs[0];
                if (dataSettlements.length > 0) {
                    const mappedSettlements = mapHeaders(dataSettlements, settlementsHeaders);
                    XLSX.utils.book_append_sheet(
                        workbook,
                        XLSX.utils.json_to_sheet(mappedSettlements),
                        'Settlements'
                    );
                }
            }

            if (workbook.SheetNames.length === 0) {
                me.notifier.alert('No data available for the selected filters.');
            } else {
                XLSX.writeFile(
                    workbook,
                    `Pending_Deposits_and_Settlements_${params.IN_CCUST}_${params.IN_DATE_FROM}_${params.IN_DATE_TO}.xlsx`
                );
                me.notifier.success('Excel downloaded successfully!');
                me.onCancelClick();
            }
        } catch (e) {
            console.error(e);
            me.notifier.alert('Error downloading Excel.');
        } finally {
            //this.getView().setLoading(false);
            const view = me.getView?.() || me.view;
            if (view) {
                view.setLoading(false);
            }
           
        }
    }
//</editor-fold>
});

