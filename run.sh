exit=0



select run in "Do nothing" "Exit" "Run front-end (npm install)" "Run front-end (serve)" "Run front-end (tests)"; do
    case $REPLY in
        1)
            echo ...
            ;;
        2)
            break
            ;;
        3)
            pushd frontend
            npm install &
            ;;
                
        4)
            pushd frontend
            ember serve &
            ;;
        5)
            pushd frontend
            ember test --server &
            ;;
        
    esac
    popd > /dev/null
done
killall ember