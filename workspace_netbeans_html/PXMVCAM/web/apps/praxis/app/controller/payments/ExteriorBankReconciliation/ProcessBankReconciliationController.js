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
                   this.getView().setLoading(true);
                   const data = await me.fetchPendingConciliation(params);
                  // if (data) me.downloadExcel(params, data);  
                   if (data) me.downloadCSV(params, data); 
                   
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

//<editor-fold defaultstate="collapsed" desc="fetchPendingConciliation">
        fetchPendingConciliation: async function (params) {
            const me = this;

            const formatParamsDeposits = {
                IN_CCUST: params.IN_CCUST,
                IN_VALDATE_FROM: params.IN_DATE_FROM,
                IN_VALDATE_TO: params.IN_DATE_TO
            };

            const formatParamsSettlements = {
                IN_CCUST: params.IN_CCUST,
                IN_PRDA_FROM: params.IN_DATE_FROM,
                IN_PRDA_TO: params.IN_DATE_TO
            };
            try {
                // Wrapper que revisa el mensaje apenas se resuelva la promesa
                const wrapSP = async (promise) => {
                    const result = await promise;
                    if (result.lstRs?.[0]?.[0]?.MENSAJE?.includes("number of rows exceeds the allowed limit")) {
                        Ext.Msg.show({
                            title: '.:ALERT:.',
                            msg: `${result.lstRs[0][0].MENSAJE} Please try a smaller date range.`,
                            buttons: Ext.MessageBox.OK,
                            icon: Ext.MessageBox.WARNING,
                            scope: me
                        });
                        throw new Error("Exceeded row limit"); // detiene la promesa
                    }
                    return result;
                };

                // Ejecutamos ambos SP en paralelo
                const [storeDeposits, storeSettlements] = await Promise.all([
                    wrapSP(global.callStoreGet('PRAXISMP', 'MPS296', formatParamsDeposits)),
                    wrapSP(global.callStoreGet('PRAXISMP', 'MPS297', formatParamsSettlements))
                ]);

                // Validación de respuesta vacía
                if (!storeDeposits || !storeSettlements) {
                    throw new Error("Connection error: one of the procedures returned empty response");
                }

                return {
                    deposits: storeDeposits.lstRs?.[0] || [],
                    settlements: storeSettlements.lstRs?.[0] || []
                };

            } catch (e) {
                if (e.message !== "Exceeded row limit") {
                    console.error("Connection error in fetchPendingConciliation:", e);
                    me.notifier.alert("Connection error while fetching data. Please try again later.");
                }
                return false;
            } finally {
                const view = me.getView?.() || me.view;
                if (view) view.setLoading(false);
            }
        },

//</editor-fold>


downloadCSV: async function (params, data) {
    const me = this;
    try {
        const baseName = `${params.IN_CCUST}_${params.IN_DATE_FROM}_${params.IN_DATE_TO}`;
        const baseNameFileZip = `Pending_Deposits_and_Settlements_${baseName}`;
        const files = [];
        // ⚠ Validar si hay datos
        if ((!data.deposits || data.deposits.length === 0) &&
            (!data.settlements || data.settlements.length === 0)) {
            me.notifier.alert("No data available for the selected filters.");
            return;
        }
        // Descarga depósitos
        if (data.deposits && data.deposits.length > 0) {
            const mappedDeposits = mapHeaders(data.deposits, depositsHeaders);
            const csvDeposits = global.jsonToCSV(mappedDeposits);
            const base64Deposits = btoa(unescape(encodeURIComponent(csvDeposits)));
            files.push({
                name: `Pending_Deposits_${baseName}.csv`,
                content: base64Deposits
            });
        }
        // Descarga liquidaciones
        if (data.settlements && data.settlements.length > 0) {
            const mappedSettlements = mapHeaders(data.settlements, settlementsHeaders);
            const csvSettlements = global.jsonToCSV(mappedSettlements);
            const base64Settlements = btoa(unescape(encodeURIComponent(csvSettlements)));
            files.push({
                name: `Pending_Settlements_${baseName}.csv`,
                content: base64Settlements
            });
        }
        await global.downloadPackBase64Files(files, baseNameFileZip);
         me.notifier.success("Excel downloaded successfully!");
        this.getView().setLoading(false);
        me.onCancelClick();
    } catch (e) {
        console.error(e);
        me.notifier.alert("Error downloading CSV.");
    } finally {
        const view = me.getView?.() || me.view;
        if (view) view.setLoading(false);
    }
},


//<editor-fold defaultstate="collapsed" desc="downloadExcel">
    downloadExcel: async function (params, data) {
    const me = this;
    try {
        // Preparar arreglo de hojas
        const sheets = [];
        if (data.deposits.length > 0) {
            const mappedDeposits = mapHeaders(data.deposits, depositsHeaders);
            sheets.push({ sheetName: "Deposits", data: mappedDeposits });
        }
        if (data.settlements.length > 0) {
            const mappedSettlements = mapHeaders(data.settlements, settlementsHeaders);
            sheets.push({ sheetName: "Settlements", data: mappedSettlements });
        }
        // ⚠ Validar si no hay nada para exportar
        if (sheets.length === 0) {
            me.notifier.alert("No data available for the selected filters.");
            return;
        }
        // Llamar a tu función global
        await global.writeCSVFromJsonMultiSheet({
            fileName: `Pending_Deposits_and_Settlements_${params.IN_CCUST}_${params.IN_DATE_FROM}_${params.IN_DATE_TO}`,
            data: sheets
        });
        me.notifier.success("Excel downloaded successfully!");
        this.getView().setLoading(false);
        me.onCancelClick();

    } catch (e) {
        console.error(e);
        me.notifier.alert("Error downloading Excel.");
    } finally {
        const view = me.getView?.() || me.view;
        if (view) view.setLoading(false);
    }
}


//</editor-fold>
});


