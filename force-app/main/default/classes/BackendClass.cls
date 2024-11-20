public with sharing class BackendCLass {
    private String var;
    public BackendCLass() {
        this.var = 'initsaaasd';
    }

    @AuraEnabled
    public static string methodName() {
        try {
            String label1 = System.label.bbc_history_logs;
            return label1;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}
