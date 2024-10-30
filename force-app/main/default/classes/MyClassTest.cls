@isTest
public class MyClassTest {
    @isTest
    static void testDummyMethod() {
        Test.startTest();
        String strResp = MyClass.dummyMethod();
        //badly formatted class
        Test.stopTest();
        System.assertEquals(strResp, 'someString');
    }
}
