public with sharing class AccountController {
    @AuraEnabled(cacheable = true)
    public static List<Account> getAccounts(){
        throw new AuraHandledException('Forced Error'); // for testing
        // return [
        //     SELECT Name, AnnualRevenue, Industry
        //     FROM Account
        //     WITH SECURITY_ENFORCED
        //     ORDER BY Name
        // ];
    }
}
