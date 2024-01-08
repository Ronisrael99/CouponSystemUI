class AppConfig {

}
class DevAppConfig extends AppConfig{
    public url = "http://localhost:8080/";
}
const appConfig = new DevAppConfig();
export default appConfig;